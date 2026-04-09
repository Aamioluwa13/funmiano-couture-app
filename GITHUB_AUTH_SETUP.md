# 🔐 GitHub Authentication Setup

GitHub now requires authentication via Personal Access Token (PAT) instead of passwords.

## Quick Setup (2 minutes)

### Step 1: Create a Personal Access Token on GitHub

1. Go to: https://github.com/settings/tokens/new
2. **Token name**: `funmiano-couture-app`
3. **Expiration**: 90 days (or custom)
4. **Scopes** (check these boxes):
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Actions and workflows)
5. Click **"Generate token"**
6. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Use the Token to Push

```powershell
cd c:\funmiano-couture-app

# Replace TOKEN with the token you just copied
git push -u origin main
# When prompted for password, paste your token (it won't show as you type)
```

### Step 3: Or Save Token for Future Use

To avoid entering token every time, you can configure Git to use it:

```powershell
# Option A: Store token temporarily (for this session)
$env:GIT_ASKPASS = 'C:\Windows\System32\cmd.exe'
$env:GIT_ASKPASS_PARAM = '/c "echo YOUR-TOKEN-HERE"'

# Then run:
git push -u origin main
```

**Option B: Use Git Credential Manager (Easier)**
```powershell
# Windows automatically shows a dialog
git push -u origin main
# Sign in with GitHub when prompted
```

---

## Getting Your Personal Access Token

1. **Visit**: https://github.com/settings/tokens/new
2. **Fill in**:
   - Token name: `funmiano-deployment`
   - Expiration: 90 days
   - Scopes: Check `repo` and `workflow`
3. **Generate and copy the token**

---

## Common Issues

### "Authentication failed"
- Make sure token is correct
- Token may have expired (create a new one)
- You might not have checked `repo` scope

### "Permission denied"
- Repository might not exist (it should!)
- Check the GitHub URL is correct

### Token not working
- Token might have expired
- Create a new token with `repo` scope

---

## Next Steps After Pushing

Once code is on GitHub:
1. Verify on github.com/Aamioluwa13/funmiano-couture-app
2. See all your commits
3. Ready to deploy to Vercel!

---

**Need help?** The token setup is the only tricky part. After this, everything is automatic!

Go to https://github.com/settings/tokens/new to create your token now!
