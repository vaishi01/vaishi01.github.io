# Vaishnavi Jaligama's Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Vite.

## 🚀 Deployment to GitHub Pages

This project is configured to deploy to GitHub Pages. There are two methods:

### Method 1: Automated Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically deploys your site when you push to the `main` branch.

**Setup Steps:**

1. **Enable GitHub Pages in your repository settings:**
   - Go to your repository on GitHub
   - Click on **Settings** → **Pages**
   - Under "Build and deployment", set **Source** to **GitHub Actions**

2. **Push your changes:**
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```

3. **Wait for deployment:**
   - Go to the **Actions** tab in your repository
   - Watch the deployment workflow complete
   - Your site will be live at `https://vaishi01.github.io/`

### Method 2: Manual Deployment

If you prefer manual deployment using the gh-pages package:

1. **Install dependencies (if not already installed):**
   ```bash
   npm install
   ```

2. **Deploy:**
   ```bash
   npm run deploy
   ```

This will build your site and push it to the `gh-pages` branch.

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

The site will be available at `http://localhost:8080`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔧 Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **Framer Motion** - Animations
- **EmailJS** - Contact form functionality
- **Three.js / React Three Fiber** - 3D graphics
- **Firebase** - Backend services

## 📝 Configuration

### Routing

The project uses `BrowserRouter` for clean URLs. GitHub Pages support is enabled through:
- `404.html` redirect script for handling client-side routes
- Custom routing handler in `index.html`
- `.nojekyll` file to prevent Jekyll processing

### Base Path

The base path is configured in `vite.config.ts` as `/` since this is a user site (username.github.io).

## 🐛 Troubleshooting

### White Screen on GitHub Pages

If you see a white screen after deployment:

1. **Check GitHub Actions:**
   - Go to the Actions tab and check if the deployment succeeded
   - Look for any error messages in the workflow logs

2. **Verify GitHub Pages Settings:**
   - Ensure "Source" is set to "GitHub Actions" (not "Deploy from a branch")
   - Check that the workflow has proper permissions

3. **Clear Browser Cache:**
   - Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
   - Try opening in an incognito/private window

4. **Check Console for Errors:**
   - Open browser DevTools (F12)
   - Check the Console tab for any errors
   - Check the Network tab for failed requests

### Build Errors

If you encounter build errors:

```bash
# Clear cache and reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

## 📄 License

This project is personal portfolio website.

## 👤 Contact

Vaishnavi Jaligama
- GitHub: [@vaishi01](https://github.com/vaishi01)
- Website: https://vaishi01.github.io/

