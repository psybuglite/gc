# guideConnect frontend

React + TypeScript + Vite + Tailwind CSS v4 implementation of the guideConnect Figma designs.

## Screens
**Guide application flow** (Figma section `16082:5412`) — one responsive React page per step; the desktop and mobile frames are the same page at the `md` breakpoint.

| Route | Step | Figma (desktop) |
| --- | --- | --- |
| `/apply` | Introduction | `16082:5413` |
| `/apply/profile` | 1a Public profile | `16082:5518` |
| `/apply/details` | 1b Private details | `16082:5718` |
| `/apply/offer` | 2a What you offer | `16083:5856` |
| `/apply/experience` | 2b Your experience | `16083:6066` |
| `/apply/story` | 2c Tour story | `16098:5155` |
| `/apply/rate` | 2d Hourly rate | `16083:6198` |
| `/apply/photos` | 3 Photos | `16086:6144` |
| `/apply/id` | 4 ID verification | `16086:6280` |
| `/apply/references` | 5 References | `16086:6534` |
| `/apply/review` | 6 Review & submit | `16088:6661` |
| `/apply/submitted` | Application submitted | `16088:6931` |
| `/apply/status/review` | Under review | `16088:7056` |
| `/apply/status/changes` | Changes requested | `16089:6877` |
| `/apply/status/approved` | Approved | `16089:7381` |
| `/apply/status/rejected` | Not approved | `16089:7535` |
| `/apply/status` | Index of the status screens (preview aid) | — |

Resubmit variants (after "Changes requested"): `/apply/id?resubmit=1` (`16089:7027`), `/apply/references?resubmit=1`, `/apply/review?resubmit=1` (`16089:7199`).

Also: `/verify` — standalone "Verify your identity" screen (Figma `16698:20190`).

Form answers persist to `localStorage` ("your progress saves as you go"). Uploaded files stay in memory only until there is an API.

## Overlays
`src/components/overlays/` — one `Overlay` (centred dialog or side sheet on desktop, bottom sheet on mobile) plus the pickers built on it: country / dial code, date (wheels), list (years, relationship), ID type, languages, and the help + support panels (opened from the top bar).

## Keeping in sync with Figma
The typeface is Poppins and type styles follow the Figma text styles (Display 40/52, Text 14/20, 16/24, 18/26, 12/18). Colours, spacing and radii are tokens in `src/index.css` (`@theme`).

## Placeholders to replace
Review notes, progress counts, the FAQ answers, support links and the "Go to dashboard" target are sample content until there is a backend. The guide dashboard itself isn't built.
