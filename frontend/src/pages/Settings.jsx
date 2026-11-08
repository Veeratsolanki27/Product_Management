import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SaveIcon from '@mui/icons-material/Save';
import BadgeIcon from '@mui/icons-material/Badge';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Swal from 'sweetalert2';
import { getCurrentUser } from '../services/api';

const Settings = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const user = getCurrentUser() || {};

  const userRolesText = Array.isArray(user.roles)
    ? user.roles.map(r => r.replace('ROLE_', '')).join(', ')
    : 'USER';

  // Dynamic Form State for Personal Details initialized from logged-in user
  const [personalInfo, setPersonalInfo] = useState({
    name: user.fullName || user.username || 'Administrator',
    username: user.username || 'admin',
    location: 'India',
    bio: 'Product Dashboard Administrator & System Operations Lead.',
    userType: userRolesText.includes('ADMIN') ? 'Super Admin' : 'Standard User',
    phone: '9876543210',
    email: user.email || 'admin@example.com',
    profileUrl: 'https://codingmstr.com',
    address: 'Mumbai, Maharashtra, India',
    zipCode: '400001',
  });

  // Dynamic Form State for Account Settings
  const [accountInfo, setAccountInfo] = useState({
    username: user.username || 'admin',
    accountEmail: user.email || 'admin@example.com',
    userType: userRolesText.includes('ADMIN') ? 'Super Admin' : 'Standard User',
    location: 'India',
  });

  useEffect(() => {
    const loggedUser = getCurrentUser();
    if (loggedUser) {
      const roles = Array.isArray(loggedUser.roles)
        ? loggedUser.roles.map(r => r.replace('ROLE_', '')).join(', ')
        : 'USER';
      setPersonalInfo((prev) => ({
        ...prev,
        name: loggedUser.fullName || loggedUser.username,
        username: loggedUser.username,
        email: loggedUser.email || '',
        userType: roles.includes('ADMIN') ? 'Super Admin' : 'Standard User',
      }));
      setAccountInfo((prev) => ({
        ...prev,
        username: loggedUser.username,
        accountEmail: loggedUser.email || '',
        userType: roles.includes('ADMIN') ? 'Super Admin' : 'Standard User',
      }));
    }
  }, []);

  // Switch states for Advance Setting
  const [switches, setSwitches] = useState({
    emailNotif: true,
    orderAlerts: true,
    security2FA: false,
  });

  // Password state
  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: '',
  });

  const handleSwitchChange = (event) => {
    setSwitches({ ...switches, [event.target.name]: event.target.checked });
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleSaveAlert = (title, text) => {
    // Persist updated user full name / email into localStorage
    const loggedUser = getCurrentUser();
    if (loggedUser) {
      loggedUser.fullName = personalInfo.name;
      loggedUser.email = personalInfo.email;
      localStorage.setItem('user', JSON.stringify(loggedUser));
    }

    Swal.fire({
      title: title || 'Saved!',
      text: text || 'Your profile details have been saved successfully.',
      icon: 'success',
      confirmButtonColor: '#1976d2',
      confirmButtonText: 'OK',
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwords.newPass || passwords.newPass !== passwords.confirm) {
      Swal.fire('Error', 'New passwords do not match!', 'error');
      return;
    }
    Swal.fire({
      title: 'Password Updated!',
      text: 'Your security password has been changed successfully.',
      icon: 'success',
      confirmButtonColor: '#1976d2',
    });
    setPasswords({ current: '', newPass: '', confirm: '' });
  };

  return (
    <Box sx={{ p: 1 }}>
      {/* Top Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.95rem',
              mr: 2,
            },
            '& .Mui-selected': {
              color: 'primary.main',
              fontWeight: 600,
            },
            '& .MuiTabs-indicator': {
              height: 3,
            },
          }}
        >
          <Tab label="Profile" />
          <Tab label="Personal Details" />
          <Tab label="My Account" />
          <Tab label="Change Password" />
        </Tabs>
      </Box>

      {/* Tab 0: Profile */}
      {tabIndex === 0 && (
        <Grid container spacing={3}>
          {/* Left Column Card: Logged In User Summary */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', height: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 72,
                    height: 72,
                    bgcolor: 'primary.main',
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    mb: 1.5,
                  }}
                >
                  {personalInfo.name ? personalInfo.name.charAt(0).toUpperCase() : 'U'}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', textAlign: 'center' }}>
                  {personalInfo.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                  @{personalInfo.username}
                </Typography>
                <Chip
                  icon={<VerifiedUserIcon fontSize="small" />}
                  label={personalInfo.userType}
                  color="primary"
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              </Box>

              <Stack spacing={2.5}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <MailIcon sx={{ color: 'primary.main' }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {personalInfo.email}
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PhoneIphoneIcon sx={{ color: 'primary.main' }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    (+91) {personalInfo.phone}
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LocationOnIcon sx={{ color: 'primary.main' }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {personalInfo.address}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>

          {/* Right Column Card: About me & Details */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, color: 'text.primary' }}>
                About Me
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 3 }}>
                {personalInfo.bio}
              </Typography>

              <Divider sx={{ my: 2.5 }} />

              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                User Account Overview
              </Typography>

              <Grid container spacing={2} sx={{ mb: 1 }}>
                <Grid size={{ xs: 4 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Full Name:
                  </Typography>
                </Grid>
                <Grid size={{ xs: 8 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {personalInfo.name}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 1.5 }} />

              <Grid container spacing={2} sx={{ mb: 1 }}>
                <Grid size={{ xs: 4 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Username:
                  </Typography>
                </Grid>
                <Grid size={{ xs: 8 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                    {personalInfo.username}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 1.5 }} />

              <Grid container spacing={2} sx={{ mb: 1 }}>
                <Grid size={{ xs: 4 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Email Address:
                  </Typography>
                </Grid>
                <Grid size={{ xs: 8 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {personalInfo.email}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 1.5 }} />

              <Grid container spacing={2} sx={{ mb: 1 }}>
                <Grid size={{ xs: 4 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Assigned Roles:
                  </Typography>
                </Grid>
                <Grid size={{ xs: 8 }}>
                  <Chip label={userRolesText} size="small" color="primary" variant="outlined" />
                </Grid>
              </Grid>
              <Divider sx={{ my: 1.5 }} />

              <Grid container spacing={2} sx={{ mb: 1 }}>
                <Grid size={{ xs: 4 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Location:
                  </Typography>
                </Grid>
                <Grid size={{ xs: 8 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {personalInfo.address}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Tab 1: Personal Details */}
      {tabIndex === 1 && (
        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSaveAlert('Updated!', 'Personal Details have been updated.'); }}>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {/* Card 1: Personal Information */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
                  Personal Information
                </Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid size={{ xs: 6 }}>
                    <TextField
                      label="Full Name"
                      value={personalInfo.name}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                      fullWidth
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <TextField
                      label="Username"
                      disabled
                      value={personalInfo.username}
                      fullWidth
                      helperText="Username is permanent"
                    />
                  </Grid>
                </Grid>
                <TextField
                  label="Bio / Designation"
                  multiline
                  rows={3}
                  value={personalInfo.bio}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, bio: e.target.value })}
                  fullWidth
                  sx={{ mb: 3 }}
                />
                <TextField
                  select
                  label="User Role"
                  value={personalInfo.userType}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, userType: e.target.value })}
                  fullWidth
                  sx={{ width: 220 }}
                >
                  <MenuItem value="Super Admin">Super Admin</MenuItem>
                  <MenuItem value="Standard User">Standard User</MenuItem>
                  <MenuItem value="Editor">Editor</MenuItem>
                </TextField>
              </Card>
            </Grid>

            {/* Card 2: Contact Information */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
                  Contact Information
                </Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid size={{ xs: 6 }}>
                    <TextField
                      label="Contact Phone"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                      fullWidth
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <TextField
                      label="Email Address"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <TextField
                  label="Profile / Website URL"
                  value={personalInfo.profileUrl}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, profileUrl: e.target.value })}
                  fullWidth
                  sx={{ mb: 3 }}
                />
                <TextField
                  label="Address & City"
                  multiline
                  rows={3}
                  value={personalInfo.address}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                  fullWidth
                />
              </Card>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{ px: 4, py: 1.2, fontWeight: 700, borderRadius: 1.5 }}
            >
              Save Personal Details
            </Button>
          </Box>
        </Box>
      )}

      {/* Tab 2: My Account */}
      {tabIndex === 2 && (
        <Stack spacing={3}>
          {/* Top Card: General Setting */}
          <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
              Account Settings
            </Typography>
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Username"
                  disabled
                  value={accountInfo.username}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Account Email"
                  value={accountInfo.accountEmail}
                  onChange={(e) => setAccountInfo({ ...accountInfo, accountEmail: e.target.value })}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  select
                  label="Account Role"
                  value={accountInfo.userType}
                  onChange={(e) => setAccountInfo({ ...accountInfo, userType: e.target.value })}
                  fullWidth
                >
                  <MenuItem value="Super Admin">Super Admin</MenuItem>
                  <MenuItem value="Standard User">Standard User</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  select
                  label="Country / Region"
                  value={accountInfo.location}
                  onChange={(e) => setAccountInfo({ ...accountInfo, location: e.target.value })}
                  fullWidth
                >
                  <MenuItem value="India">India</MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="UK">UK</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Card>

          {/* Bottom Card: Advance Setting */}
          <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
              Preferences & Notifications
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Manage alerts and communication settings
            </Typography>
            <Stack spacing={1} sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={switches.emailNotif}
                    onChange={handleSwitchChange}
                    name="emailNotif"
                    color="primary"
                  />
                }
                label="Email Notifications on New Orders"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={switches.orderAlerts}
                    onChange={handleSwitchChange}
                    name="orderAlerts"
                    color="primary"
                  />
                }
                label="Stock Level & Inventory Alerts"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={switches.security2FA}
                    onChange={handleSwitchChange}
                    name="security2FA"
                    color="primary"
                  />
                }
                label="Require Two-Factor Authentication (2FA) on Login"
              />
            </Stack>
          </Card>
        </Stack>
      )}

      {/* Tab 3: Change Password */}
      {tabIndex === 3 && (
        <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', maxWidth: 500 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
            Change Account Password
          </Typography>
          <Box component="form" onSubmit={handlePasswordSubmit}>
            <Stack spacing={2.5}>
              <TextField
                label="Current Password"
                type="password"
                required
                fullWidth
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              />
              <TextField
                label="New Password"
                type="password"
                required
                fullWidth
                value={passwords.newPass}
                onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
              />
              <TextField
                label="Confirm New Password"
                type="password"
                required
                fullWidth
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              />
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{ py: 1.2, fontWeight: 700, borderRadius: 1.5, mt: 1 }}
              >
                Update Password
              </Button>
            </Stack>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default Settings;
