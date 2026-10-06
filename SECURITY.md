# Security policy

## Scope

This repository is a static personal portfolio built with HTML, CSS and JavaScript. It has no application backend, authentication, payment processing or server-side data storage. Security fixes apply to the current website source; older snapshots do not have a separate maintenance commitment.

## Report a concern privately

Email **[mensahserene2020@gmail.com](mailto:mensahserene2020@gmail.com)** with the subject **Portfolio security report**. This is Serene's existing contact address, not a dedicated security team.

Include the affected URL or file, a clear description, reproducible steps, the possible impact and any suggested fix. Remove secrets and unrelated personal information from screenshots or examples. Do not open a public issue containing vulnerability details or private information.

Reports are reviewed as availability allows; no response-time commitment or bounty programme is offered. Coordinate public disclosure with the owner after a fix can be assessed.

## Safe maintenance

- Never commit credentials, access tokens, private keys or local environment files. `.gitignore` helps prevent accidental additions but does not remove secrets already committed.
- Keep links and image paths intentional. External links opened in new tabs should retain `rel="noopener noreferrer"`.
- Keep the site free of unnecessary third-party scripts. Review any proposed external resource before adding it.
- Preserve safe handling when browser storage is unavailable. Theme preferences must not contain personal or sensitive data.
- If credentials are exposed, revoke or rotate them promptly and notify the owner privately.

This policy provides a reporting route and maintenance guidance; it does not claim the site has undergone a formal security audit.
