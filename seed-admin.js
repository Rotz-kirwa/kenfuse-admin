// Run this in browser console to create default admin
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
if (!admins.find(a => a.email === defaultAdmin.email)) {
  admins.push(defaultAdmin)
  localStorage.setItem('kenfuse_admins', JSON.stringify(admins))
  console.log('Default admin created: admin@kenfuse.com / admin123')
} else {
  console.log('Admin already exists')
}
