# Vercel Deployment Guide - Wani Web

## Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository connected
- Backend API deployed (Railway)

## Step 1: Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

## Step 2: Create Vercel Project

### Option A: Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Import your GitHub repository `PDAC95/wani`
3. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `apps/web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Option B: Via Vercel CLI

```bash
cd apps/web
vercel
```

Follow the prompts to link your project.

## Step 3: Configure Environment Variables

Add the following environment variables in Vercel dashboard:

### Production Environment
```
VITE_API_BASE_URL=https://your-railway-app.railway.app
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000
VITE_APP_NAME=Wani
VITE_APP_ENV=production
```

### Preview/Staging Environment
```
VITE_API_BASE_URL=https://your-railway-staging.railway.app
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000
VITE_APP_NAME=Wani
VITE_APP_ENV=staging
```

### Development Environment (Local)
Use `.env.local` file (already configured)

## Step 4: Configure Deployment Settings

### Build Settings (vercel.json)
Already configured in `apps/web/vercel.json`:
- SPA routing rewrites
- Cache headers for static assets
- Environment variable mapping

### Git Integration
- **Production Branch**: `main`
- **Preview Branches**: All other branches
- **Automatic Deployments**: Enabled

## Step 5: Deploy

### Automatic Deployment
Push to GitHub:
```bash
git add .
git commit -m "feat: configure Vercel deployment"
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Build the project
3. Deploy to production (main branch) or preview (other branches)

### Manual Deployment (CLI)
```bash
cd apps/web

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Step 6: Verify Deployment

### Check Deployment Status
1. Go to Vercel dashboard → Your project → Deployments
2. Wait for deployment to complete (2-5 minutes)
3. Click on deployment URL

### Test Checklist
- [ ] App loads successfully
- [ ] Routing works (/, /auth/login, /auth/register, /dashboard)
- [ ] Tailwind CSS styles are applied
- [ ] No console errors
- [ ] API base URL is correct (check Network tab)
- [ ] Environment variables are loaded

### Test URLs
```bash
# Production
https://wani.vercel.app

# Preview (branch-based)
https://wani-git-feature-branch.vercel.app
```

## Step 7: Configure Custom Domain (Optional)

1. Go to Vercel dashboard → Your project → Settings → Domains
2. Add your custom domain (e.g., `app.wani.com`)
3. Update DNS records as instructed
4. Wait for SSL certificate provisioning (automatic)

## Troubleshooting

### Build Fails
**Issue**: Build fails with TypeScript errors
**Solution**:
```bash
# Run build locally first
cd apps/web
npm run build

# Fix any TypeScript errors
npm run lint
```

**Issue**: Missing environment variables
**Solution**: Check Vercel dashboard → Settings → Environment Variables

### Routing Issues (404 on refresh)
**Issue**: Page refreshes return 404
**Solution**: Ensure `vercel.json` has SPA rewrites configured:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### API Connection Issues
**Issue**: Cannot connect to backend API
**Solution**:
1. Verify `VITE_API_BASE_URL` environment variable
2. Check CORS settings on backend
3. Ensure Railway backend is running

### Slow Build Times
**Issue**: Builds take too long
**Solution**:
1. Enable caching in Vercel
2. Optimize dependencies (remove unused packages)
3. Use dynamic imports for code splitting

## Performance Optimization

### 1. Enable Vercel Analytics
```bash
npm install @vercel/analytics
```

```typescript
// apps/web/src/main.tsx
import { inject } from '@vercel/analytics'

inject()
```

### 2. Enable Vercel Speed Insights
```bash
npm install @vercel/speed-insights
```

```typescript
// apps/web/src/main.tsx
import { injectSpeedInsights } from '@vercel/speed-insights'

injectSpeedInsights()
```

### 3. Configure Build Cache
Vercel automatically caches:
- `node_modules`
- Build artifacts
- Next.js cache (if applicable)

## CI/CD Workflow

### Automatic Deployments
```
main branch → Production (wani.vercel.app)
develop branch → Preview (wani-git-develop.vercel.app)
feature/* → Preview (wani-git-feature-name.vercel.app)
```

### Deployment Hooks
Create deployment hooks for:
- Slack notifications
- Discord webhooks
- Custom CI/CD integrations

Go to: Settings → Git → Deploy Hooks

## Monitoring & Logs

### View Deployment Logs
1. Vercel dashboard → Deployments
2. Click on deployment
3. View Build Logs and Function Logs

### Runtime Logs
```bash
vercel logs <deployment-url>
```

### Analytics
- Go to: Project → Analytics
- Monitor:
  - Page views
  - User sessions
  - Performance metrics
  - Error rates

## Rollback Strategy

### Automatic Rollback
If deployment fails, Vercel keeps previous version active.

### Manual Rollback
1. Go to: Deployments
2. Find previous successful deployment
3. Click "Promote to Production"

### Git Rollback
```bash
git revert <commit-hash>
git push origin main
```

## Cost Estimation

### Vercel Pricing (as of 2024)
- **Hobby (Free)**:
  - 100GB bandwidth/month
  - Unlimited deployments
  - Perfect for staging

- **Pro ($20/month)**:
  - 1TB bandwidth
  - Team collaboration
  - Password protection
  - Recommended for production

### Bandwidth Usage Estimate
- Average page size: ~500KB
- Estimated monthly users: 1,000
- Average pages per session: 5
- **Total bandwidth**: ~2.5GB/month

**Recommendation**: Start with Hobby plan, upgrade to Pro when needed.

## Security Best Practices

### 1. Environment Variables
- ✅ Never commit `.env.local` to Git
- ✅ Use Vercel dashboard for secrets
- ✅ Rotate API keys regularly

### 2. CORS Configuration
Ensure backend allows Vercel domains:
```python
# backend/app/core/config.py
ALLOWED_ORIGINS = [
    "https://wani.vercel.app",
    "https://wani-*.vercel.app",  # Preview deployments
    "http://localhost:5173",      # Local development
]
```

### 3. Authentication
- Use HTTPS only (automatic on Vercel)
- Implement secure token storage
- Enable CSP headers (if needed)

## Next Steps

After successful deployment:
1. Update frontend environment variables with production API URL
2. Test all critical user flows
3. Set up error monitoring (Sentry, LogRocket)
4. Configure custom domain
5. Enable Vercel Analytics
6. Set up staging → production workflow

## Useful Commands

```bash
# List all deployments
vercel ls

# View deployment logs
vercel logs <deployment-url>

# Inspect deployment
vercel inspect <deployment-url>

# Remove deployment
vercel remove <deployment-url>

# Link local project to Vercel
vercel link

# Pull environment variables
vercel env pull .env.local
```

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite on Vercel](https://vercel.com/docs/frameworks/vite)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Vercel Support](https://vercel.com/support)
