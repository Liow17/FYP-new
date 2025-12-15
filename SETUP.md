# Setup Instructions for AI Features

## Prerequisites
- Node.js installed
- Git installed
- Google Gemini API key

## Step-by-Step Setup

### 1. Clone or Pull Latest Code
```bash
cd "C:\Users\jinho\Downloads\FYP-new V3"
git pull origin claude/copy-repo-to-new-01H5uqhWya7hZBdsSCxFujVN
```

### 2. Create .env.local File
**IMPORTANT:** Create a file named `.env.local` (NOT `.env.example`) in the project root directory.

**Windows PowerShell:**
```powershell
# Navigate to project directory
cd "C:\Users\jinho\Downloads\FYP-new V3"

# Create .env.local file
echo "GEMINI_API_KEY=AIzaSyDzTNbLll6KNPtVGxzvT88eN39CQa5lW1k" | Out-File -FilePath .env.local -Encoding utf8
```

**Or manually create the file:**
1. Right-click in the project folder → New → Text Document
2. Name it `.env.local` (make sure it's `.env.local`, not `.env.local.txt`)
3. Open it and add:
```
GEMINI_API_KEY=AIzaSyDzTNbLll6KNPtVGxzvT88eN39CQa5lW1k
```
4. Save and close

### 3. Install Dependencies
```powershell
npm install
```

### 4. Clear Next.js Cache
```powershell
Remove-Item -Recurse -Force .next
```

### 5. Start Development Server
```powershell
npm run dev
```

### 6. Verify Setup
1. Open browser to http://localhost:3000
2. Click "AI Security Tutor" 🤖
3. Try sending a message like "What is phishing?"
4. If you see "API key not configured" error, check that `.env.local` exists

## Troubleshooting

### Error: "models/gemini-1.5-flash is not found"
- You're running old code
- Run: `git pull origin claude/copy-repo-to-new-01H5uqhWya7hZBdsSCxFujVN`
- Delete `.next` folder
- Restart server

### Error: "API key not configured"
- `.env.local` file is missing or named incorrectly
- Make sure file is named `.env.local` (NOT `.env.example`)
- File should be in project root directory

### Error: "403 Forbidden"
- API key is incorrect
- Check that GEMINI_API_KEY value is correct in `.env.local`

### Changes not showing up
- Clear `.next` cache: `Remove-Item -Recurse -Force .next`
- Hard refresh browser: Ctrl + Shift + R
- Restart development server

## Verify Files

After setup, verify these files exist:
- ✅ `.env.local` (contains API key)
- ✅ `app/api/chat/route.ts` (line 45 should have `gemini-2.5-flash`)
- ✅ `app/api/ai-tutor/route.ts` (line 46 should have `gemini-2.5-flash`)
- ✅ `app/api/generate-scenario/route.ts` (line 53 should have `gemini-2.5-flash`)

## Model Information

Current model: **gemini-2.5-flash**
- Latest Gemini 2.5 model from Google AI Studio
- Fast and efficient for conversational AI
- Supports text generation and chat
- Works with API version v1beta
