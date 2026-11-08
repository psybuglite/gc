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
| `/apply/submitted` | Placeholder confirmation (real screen not built yet) | `16088:6931` |

Also: `/verify` — standalone "Verify your identity" screen (Figma `16698:20190`).

Form answers persist to `localStorage` ("your progress saves as you go"). Uploaded files stay in memory only until there is an API.

## Not built yet
Status screens (submitted / under review / changes requested / approved / not approved), picker modals and sheets (country, date, language, ID type…), help & support panels, and the error / "needs changes" variants. Country, language, years and relationship pickers currently use native selects.

## Develop
```bash
npm install
npm run dev
npm run build
```

Design tokens live in `src/index.css` (`@theme`). Icons are from [Untitled UI icons](https://github.com/untitleduico/icons).
