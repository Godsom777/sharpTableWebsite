# 🚨 URGENT SECURITY ALERT 🚨

**Date:** January 31, 2026  
**Severity:** CRITICAL  
**Status:** ACTION REQUIRED IMMEDIATELY

---

## ⚠️ CONFIRMED SECURITY BREACH

**Your `.env` file with live credentials has been committed to GitHub at least 4 times:**
- Repository: `https://github.com/Godsom777/sharpTableWebsite.git`
- Commits found: `68ba793`, `bc705f2`, `018d33f`, `c3178dd`

### Exposed Credentials:
1. **Live Paystack Public Key:** `pk_live_e64a98438e270359d525099624bf0f096b64d17e`
2. **Supabase Project URLs:** 
   - `https://eplonlnwcuyqhgkrhqzg.supabase.co`
   - `https://wwlopezoazuugxcvjgus.supabase.co`
3. **Supabase Anon Keys (JWT tokens)** for both projects

**⚠️ These keys are now public and in GitHub's history forever (unless you take action).**

---

## ✅ IMMEDIATE ACTIONS TAKEN

1. ✓ Removed `.env` from git tracking (file still exists locally)
2. ✓ Cleaned up `PAYSTACK_SETUP.md` with placeholders
3. ✓ Created security audit report

---

## 🔥 CRITICAL ACTIONS REQUIRED (DO NOW!)

### Step 1: Rotate ALL Keys (MANDATORY - Do First!)

#### Paystack Public Key:
1. Go to https://dashboard.paystack.com/settings/developer
2. Generate a NEW public key
3. Update your local `.env` file with new key
4. Update Vercel project settings → Environment Variables
5. Redeploy your site

#### Supabase Project 1 (eplonlnwcuyqhgkrhqzg):
1. Go to https://supabase.com/dashboard/project/eplonlnwcuyqhgkrhqzg/settings/api
2. Under "Project API keys" → Click "Roll anon key" 
3. Copy the new anon key
4. Update your local `.env` → `VITE_SUPABASE_ANON_KEY`
5. Update Vercel environment variables

#### Supabase Project 2 (wwlopezoazuugxcvjgus):
1. Go to https://supabase.com/dashboard/project/wwlopezoazuugxcvjgus/settings/api
2. Under "Project API keys" → Click "Roll anon key"
3. Copy the new anon key  
4. Update your local `.env` → `VITE_APP_SUPABASE_ANON_KEY`
5. Update Vercel environment variables

---

### Step 2: Clean Git History (IMPORTANT)

The `.env` file is in GitHub's history. You have 3 options:

#### Option A: BFG Repo-Cleaner (Recommended - Easiest)
```powershell
# Install BFG (one-time)
# Download from: https://rtyley.github.io/bfg-repo-cleaner/

# Clone a fresh copy
cd ..
git clone --mirror https://github.com/Godsom777/sharpTableWebsite.git

# Remove .env from all history
java -jar bfg.jar --delete-files .env sharpTableWebsite.git

# Cleanup
cd sharpTableWebsite.git
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push to GitHub
git push --force
```

#### Option B: git filter-repo (More Control)
```powershell
# Install git-filter-repo
pip install git-filter-repo

# In your repo
git filter-repo --path .env --invert-paths --force

# Force push
git push origin --force --all
```

#### Option C: Start Fresh (Nuclear Option)
1. Create a NEW GitHub repository
2. Copy all files EXCEPT `.git` folder
3. Ensure `.env` is in `.gitignore`
4. Initialize new git repo
5. Push to new repository
6. Update Vercel to point to new repo
7. Delete old repository

---

### Step 3: Commit Current Changes

After rotating keys and before cleaning history:

```powershell
git add .gitignore PAYSTACK_SETUP.md SECURITY_AUDIT_REPORT.md URGENT_SECURITY_ACTION.md
git commit -m "security: Remove .env from tracking and sanitize documentation"
```

---

### Step 4: Monitor for Abuse

For the next 48 hours, monitor:
- **Paystack Dashboard:** Check for unauthorized payment attempts
- **Supabase Logs:** Look for unusual API calls or authentication attempts
- **Email alerts:** Watch for notifications from both services

---

## � VERIFICATION CHECKLIST

After completing all steps:

- [ ] **Rotated Paystack public key**
  - [ ] Updated local `.env`
  - [ ] Updated Vercel environment variables
  - [ ] Tested payment flow still works

- [ ] **Rotated Supabase anon key (Project 1)**
  - [ ] Updated local `.env`
  - [ ] Updated Vercel environment variables

- [ ] **Rotated Supabase anon key (Project 2)**
  - [ ] Updated local `.env`
  - [ ] Updated Vercel environment variables
  - [ ] Tested app authentication still works

- [ ] **Cleaned Git history**
  - [ ] Chose cleanup method (BFG/filter-repo/fresh start)
  - [ ] Removed `.env` from all commits
  - [ ] Force pushed to GitHub

- [ ] **Verified cleanup**
  ```powershell
  # Clone repo fresh and search for keys
  cd ..
  git clone https://github.com/Godsom777/sharpTableWebsite.git test-clone
  cd test-clone
  git log --all --source --full-history -- .env
  # Should show no results
  ```

- [ ] **Re-deployed site**
  - [ ] Triggered new Vercel deployment
  - [ ] Tested all payment functionality
  - [ ] Verified no errors in console

---

## 🎯 WHY THIS MATTERS

Even though these are "public" keys (Paystack pk_live and Supabase anon):

1. **Paystack Public Key:** Attackers can:
   - Initiate payment flows to your account
   - Test your payment infrastructure
   - Potentially find vulnerabilities in your webhook handling

2. **Supabase Anon Keys:** Attackers can:
   - Query your database (within RLS rules)
   - Enumerate your API structure
   - Attempt to bypass Row Level Security
   - Perform DoS attacks on your database

3. **Supabase URLs:** Reveals:
   - Your project identifiers
   - Infrastructure location
   - Makes targeted attacks easier

---

## ⏱️ TIME ESTIMATE

- Key rotation: 20-30 minutes
- Git history cleanup with BFG: 15-20 minutes  
- Testing and verification: 20-30 minutes
- **Total: 55-80 minutes**

---

## 📞 IF YOU NEED HELP

1. **Paystack Support:** support@paystack.com
2. **Supabase Support:** https://supabase.com/dashboard/support
3. **Security Audit Report:** See `SECURITY_AUDIT_REPORT.md`

---

## ⚠️ IMPORTANT NOTES

- **Don't commit again until keys are rotated**
- **Don't deploy until Vercel env vars are updated**  
- **Don't skip the git history cleanup** - keys will remain searchable on GitHub forever
- **Consider enabling GitHub Secret Scanning** for future protection

---

**This is not a drill. Please complete these steps as soon as possible.**
