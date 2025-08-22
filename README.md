# Time-First Gravity Blog

A blog exploring the temporal geometry framework for understanding gravity, with detailed explanations of research papers.

## Local Development

To view the blog locally with proper CSS and navigation:

```bash
# Using Python 3 (recommended)
python3 serve.py

# Or directly
./serve.py

# Or using Python's built-in server
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## Directory Structure

```
/timefirstgravityblog/
├── index.html              # Homepage
├── css/
│   └── main.css           # Shared styles
├── js/
│   └── navigation.js      # Navigation functionality
├── papers/
│   └── paper6-black-holes/
│       ├── overview.html  # High-level overview
│       └── step-by-step/  # Detailed walkthrough
│           ├── index.html # Table of contents
│           └── 1-9.html   # Individual chapters
└── assets/                # Images and diagrams
```

## Adding New Content

### To add a new paper explanation:

1. Create a new folder in `/papers/` (e.g., `paper1-gravity-temporal`)
2. Create an `overview.html` for the high-level explanation
3. Optionally create a `step-by-step/` folder with detailed chapters
4. Update the homepage card in `index.html`

### Navigation Structure

Every page includes:
- Global navigation bar with Papers dropdown
- Breadcrumb navigation
- View toggle (Overview ↔ Step-by-Step) where applicable
- Chapter sidebar for step-by-step guides

## Deployment

For GitHub Pages deployment:
1. Push to a GitHub repository
2. Enable GitHub Pages in repository settings
3. The site will be available at `https://[username].github.io/[repository-name]/`

## Technologies Used

- Pure HTML/CSS for maximum compatibility
- No JavaScript dependencies (navigation enhancement optional)
- Responsive design for mobile and desktop
- Clean, academic styling appropriate for scientific content