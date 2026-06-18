# TODO

## Onboarding flow updates
- [x] Update onboarding step ids/types and ONBOARDING_STEPS order to: school-information (school-details) -> subdomain -> branding -> logo -> admin -> review
- [x] Replace placeholder LogoStep with the requested LogoStep implementation (props onBack?/onNext?)
- [x] Update onboarding navigation logic in app/Auth/Signup/page.tsx so branding Continue goes to logo (not review) and the full chain works: school-details -> subdomain -> branding -> logo -> admin-details -> review
- [x] Wire Continue/Back navigation for subdomain, admin, and review steps (add props and buttons)
- [x] Verify TypeScript/build and that onboarding can advance through all steps


