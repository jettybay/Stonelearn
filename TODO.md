# TODO - Fix landing page misconfiguration

## Plan
- Identify why `/` still shows default Next.js page.
- Remove/merge conflicting route definitions between `app/` and `src/app/`.
- Align root layout/metadata with landing implementation.
- Restart dev server and verify `/` renders intended landing.

## Steps
- [x] Inspect `src/app/page.tsx` (confirmed landing components)
- [x] Inspect root `app/page.tsx` (confirmed it’s still the default template)
- [x] Inspect `app/layout.tsx` and `src/app/layout.tsx` (confirmed duplicated layouts/metadata)
- [x] Root `app/*` route files are conflicting with `src/app/*` (root `app/page.tsx` is default template)
- [x] Restore root `app/*` so Next routes work again (landing rendered from root)


- [ ] Run `npm run dev` and verify `/` renders `src/app/page.tsx`
- [ ] Run `npm run build` (optional) to confirm no routing issues


