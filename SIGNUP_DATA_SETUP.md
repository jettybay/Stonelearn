# Signup Data Capture System

## Overview

This system captures all user input during the signup process and stores it for later use during login and account creation. The data is currently persisted in browser localStorage but can be easily integrated with a backend API.

## Architecture

### Components

1. **`src/utility/signupData.ts`** - Core data management utility
   - Functions to create, save, retrieve, and update signup data
   - Type definitions for the signup form data structure
   - Comments indicating where backend integration is needed

2. **`src/utility/useSignupData.ts`** - React hook for component integration
   - Provides reactive state management for signup data
   - Manages loading and error states
   - Exposes methods to update specific form fields

3. **`app/signup-data/page.tsx`** - Dashboard page to view captured data
   - Visual display of all captured signup information
   - Completion progress tracking
   - Export/download functionality
   - Test/debugging page

4. **Updated Signup Components**:
   - `src/components/onboarding/subdomain-step.tsx` - Now captures subdomain
   - `src/components/onboarding/branding-step.tsx` - Now captures color choice
   - `app/Auth/Signup/page.tsx` - Integrated data capture hooks

## Data Structure

```typescript
type SignupFormData = {
  id: string;                    // Unique session ID
  createdAt: string;             // ISO timestamp
  updatedAt: string;             // ISO timestamp
  schoolInformation: {
    schoolName: string;
    schoolType: string;
    country: string;
    state: string;
    website: string;
  } | null;
  subdomain: string;             // e.g., "my-school"
  branding: {
    primaryColor: string;        // e.g., "#722F37"
  };
  logo: {
    fileName: string;
    fileSize: number;
    fileType: string;
    fileData: string | null;     // Base64 encoded
  } | null;
  adminAccount: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  } | null;
  status: "in-progress" | "completed" | "submitted";
};
```

## Usage

### In Components

```tsx
import { useSignupData } from "@/utility/useSignupData";

function MyComponent() {
  const {
    data,
    isLoading,
    error,
    updateSchoolInformation,
    updateSubdomain,
    updatePrimaryColor,
    updateLogo,
    updateAdminAccount,
    submit,
    clear,
    refresh,
  } = useSignupData();

  // Use the hook methods to update data
  // Data is automatically persisted to localStorage
}
```

### Direct Access

```tsx
import {
  getSignupData,
  setSchoolInformation,
  setSubdomain,
  submitSignupData,
  exportSignupDataAsJSON,
} from "@/utility/signupData";

// Get current signup data
const data = getSignupData();

// Export for debugging
const json = exportSignupDataAsJSON();
console.log(json);
```

## Current Flow

1. User starts signup at `/app/Auth/Signup/page.tsx`
2. As user completes each step, data is captured and stored in localStorage
3. User can view all captured data at `/app/signup-data`
4. Data persists across browser sessions (until manually cleared)

## Backend Integration (When Ready)

### Step 1: Setup API Endpoints

Create these backend endpoints:

```
POST /api/auth/signup
- Body: All signup data
- Returns: { token, userId, workspace }

GET /api/auth/signup-data/:sessionId
- Returns: Stored signup data for a session

POST /api/auth/verify-email
- Body: { email, verificationCode }
- Returns: { verified: boolean }
```

### Step 2: Update `src/utility/signupData.ts`

Replace localStorage calls with API calls:

```tsx
// Replace this:
// localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

// With this:
// const response = await fetch('/api/auth/signup-data', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(data)
// });
```

### Step 3: Update `submitSignupData()` Function

```tsx
// Current implementation is commented out
// Uncomment and update the API endpoint:

export async function submitSignupData(): Promise<...> {
  // ... validation code ...

  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      schoolInformation: data.schoolInformation,
      subdomain: data.subdomain,
      branding: data.branding,
      logoFile: {
        fileName: data.logo.fileName,
        fileType: data.logo.fileType,
        fileData: data.logo.fileData,
      },
      adminAccount: {
        firstName: data.adminAccount.firstName,
        lastName: data.adminAccount.lastName,
        email: data.adminAccount.email,
        phone: data.adminAccount.phone,
        password: data.adminAccount.password,
      }
    })
  });

  const result = await response.json();
  localStorage.setItem('auth_token', result.token);
  return { success: true, message: 'Account created', data: result };
}
```

### Step 4: Handle File Uploads

For large files, consider uploading logos separately:

```tsx
// Instead of storing as base64:
// Use multipart/form-data or:
const formData = new FormData();
formData.append('logo', logoFile);
const uploadResponse = await fetch('/api/upload/logo', { method: 'POST', body: formData });
const { logoUrl } = await uploadResponse.json();

// Store URL instead of file data:
data.logo = { fileName, fileType, fileSize, logoUrl };
```

### Step 5: Add Email Verification

```tsx
// Add verification step after signup submission
const { verificationCode } = result; // Sent to user's email

// User verifies email
const verified = await fetch('/api/auth/verify-email', {
  method: 'POST',
  body: JSON.stringify({ email, verificationCode })
});
```

### Step 6: Update Login Page

When users return to login:

```tsx
import { getSignupData } from "@/utility/signupData";

export default function LoginPage() {
  // Pre-fill email if signup was incomplete
  const signupData = getSignupData();
  const [email, setEmail] = useState(signupData?.adminAccount?.email || "");

  // ... login form ...
}
```

## Security Considerations

⚠️ **Important**: Before deploying to production:

1. **Password Storage**: Passwords should NEVER be stored in localStorage
   - Currently they are for form persistence only
   - Send passwords only over HTTPS
   - Use bcrypt/argon2 on backend

2. **Email Verification**: Require email verification before account activation

3. **Rate Limiting**: Add rate limiting on signup endpoint to prevent abuse

4. **Input Validation**: Validate all inputs on both frontend and backend

5. **HTTPS Only**: Ensure all API calls use HTTPS

6. **CORS**: Configure CORS properly on backend

7. **File Upload Security**: 
   - Validate file types on backend
   - Scan for malware
   - Store in secure location
   - Use CDN for serving

## Testing

### Test the Signup Data Flow

1. Go to `/app/Auth/Signup`
2. Fill in all signup steps
3. Visit `/app/signup-data` to see the captured data
4. Open browser DevTools > Application > Local Storage
5. Look for key: `stonelearn_signup_data`

### Export Data for Testing

```tsx
import { exportSignupDataAsJSON } from "@/utility/signupData";

// In console:
console.log(exportSignupDataAsJSON());
```

### Clear Data

```tsx
import { clearSignupData } from "@/utility/signupData";

// In console:
clearSignupData();
// Refresh the page
```

## Future Enhancements

- [ ] Multi-step form state recovery (resume interrupted signup)
- [ ] Automatic save every 30 seconds
- [ ] Undo/redo functionality
- [ ] Save as draft and resume later
- [ ] Team member invitations during signup
- [ ] Custom domain configuration
- [ ] Two-factor authentication setup
- [ ] Batch user import via CSV

## File Locations

```
src/utility/
  ├── signupData.ts              # Core utility
  ├── useSignupData.ts           # React hook
  └── store.ts                   # Existing store

src/components/onboarding/
  ├── subdomain-step.tsx         # Updated
  ├── branding-step.tsx          # Updated
  └── (other steps unchanged)

app/
  ├── Auth/Signup/page.tsx       # Updated with data capture
  └── signup-data/page.tsx       # New dashboard
```

## Questions?

If you have questions about the implementation or need to modify the data structure, refer to the comments in `signupData.ts` marked with `TODO: When backend APIs are ready`.
