# KENFUSE Admin Panel

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Default Admin Account
Open browser console on the admin site and run:
```javascript
const defaultAdmin = {
  id: 1,
  name: 'Admin User',
  email: 'admin@kenfuse.com',
  phone: '0700000000',
  password: 'admin123',
  photo: '',
  status: 'active',
  createdAt: new Date().toISOString().split('T')[0]
}

const admins = JSON.parse(localStorage.getItem('kenfuse_admins') || '[]')
admins.push(defaultAdmin)
localStorage.setItem('kenfuse_admins', JSON.stringify(admins))
console.log('Admin created!')
```

### 3. Login Credentials
- Email: `admin@kenfuse.com`
- Password: `admin123`

### 4. Run Development Server
```bash
npm run dev
```

## Features

✅ **Secure Login** - Protected routes with authentication
✅ **Dashboard** - Real-time stats from main site
✅ **User Management** - View all registered users
✅ **Vendor Applications** - Approve/reject vendor requests
✅ **Contributions Tracking** - Monitor all donations
✅ **Admin Management** - Add/suspend/delete admins

## Data Source

The admin panel reads data from the main KENFUSE site via localStorage:
- `kenfuse_registered_users` - All registered users
- `kenfuse_wills` - Created wills
- `kenfuse_memorials` - Memorial records
- `kenfuse_fundraisers` - Fundraising campaigns
- `vendor_applications` - Vendor applications
- `kenfuse_admins` - Admin accounts

## Deployment

Deploy to Vercel:
```bash
vercel --prod
```

Make sure both admin and main site share the same domain for localStorage access.
