# Google Search Console Setup Guide

## Why Google Search Console?
Google Search Console helps you:
- ✅ Monitor your site's presence in Google Search
- ✅ Submit sitemaps for faster indexing
- ✅ Identify and fix indexing issues
- ✅ See search queries that bring users to your site
- ✅ Monitor site performance in search results

## Step 1: Verify Your Site

### Method A: HTML Tag (Recommended)
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property"
3. Enter your URL: `https://fabricprep-5vsnekusk-certprep.vercel.app/`
4. Choose "HTML tag" verification method
5. Copy the meta tag provided (looks like: `<meta name="google-site-verification" content="...">`)
6. Add it to your `index.html` in the `<head>` section
7. Click "Verify"

### Method B: DNS Verification (if you have custom domain)
1. Choose "Domain" property type
2. Follow DNS verification instructions
3. Add TXT record to your domain DNS

## Step 2: Submit Sitemap
1. After verification, go to "Sitemaps" in left menu
2. Enter: `https://fabricprep-5vsnekusk-certprep.vercel.app/sitemap.xml`
3. Click "Submit"
4. Google will start crawling your pages

## Step 3: Request Indexing
1. Go to "URL Inspection" tool
2. Enter your homepage URL
3. Click "Request Indexing"
4. Repeat for key certification pages:
   - `/microsoft-fabric-dp-700`
   - `/microsoft-fabric-dp-600`
   - `/microsoft-azure-az-900`
   - `/microsoft-azure-dp-900`

## Step 4: Monitor Performance
Check these reports regularly:
- **Performance Report**: See which queries bring traffic
- **Coverage Report**: Check for indexing errors
- **Enhancements**: Monitor structured data errors
- **Mobile Usability**: Ensure mobile-friendly experience

## Step 5: Additional Optimization

### 1. Fix Any Issues
- Resolve any crawl errors reported
- Fix mobile usability issues
- Address security issues if any

### 2. Use URL Parameters (if needed)
If you have duplicate content issues, set up URL parameters in Search Console

### 3. Set Preferred Domain
Choose whether to use `www` or non-www version (if using custom domain)

## Expected Timeline
- **Initial indexing**: 1-7 days
- **Full site indexing**: 1-4 weeks
- **Search traffic**: Starts appearing after indexing

## Quick Links
- **Google Search Console**: https://search.google.com/search-console
- **Your Sitemap**: https://fabricprep-5vsnekusk-certprep.vercel.app/sitemap.xml
- **Robots.txt**: https://fabricprep-5vsnekusk-certprep.vercel.app/robots.txt
- **Live Site**: https://fabricprep-5vsnekusk-certprep.vercel.app/

## Tips for Better Ranking
1. **Content Quality**: Keep adding high-quality practice questions
2. **User Experience**: Fast loading, mobile-friendly
3. **Backlinks**: Share on relevant forums and communities
4. **Regular Updates**: Add new questions regularly
5. **User Engagement**: Encourage users to spend time on site

## Monitoring Keywords
Track these potential search terms:
- "Microsoft Fabric practice questions"
- "DP-700 exam practice"
- "Azure certification free practice"
- "Fabric Data Engineer exam prep"
- "AZ-900 practice test free"