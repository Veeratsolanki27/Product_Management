import React, { useState } from 'react';
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
import Stack from '@mui/material/Stack';
import Swal from 'sweetalert2';

const Settings = () => {
  const [tabIndex, setTabIndex] = useState(0);

  // Dynamic Form State for Personal Details
  const [personalInfo, setPersonalInfo] = useState({
    name: 'P Kumar',
    location: 'India',
    bio: 'Managing the Product Dashboard & UI Operations',
    userType: 'Super Admin',
    phone: '91999999999',
    email: 'code@codingmstr.com',
    profileUrl: 'https://codingmstr.com',
    address: 'Patna, India',
  });

  // Dynamic Form State for Account Settings
  const [accountInfo, setAccountInfo] = useState({
    username: 'CodingMSTR',
    accountEmail: 'code@codingmstr.com',
    userType: 'Super Admin',
    location: 'India',
  });

  // Switch states for Advance Setting
  const [switches, setSwitches] = useState({
    gilad: true,
    jason: false,
    antoine: true,
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
    Swal.fire({
      title: title || 'Saved!',
      text: text || 'Your changes have been saved successfully.',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    });
  };

  return (
    <Box sx={{ p: 1 }}>
      {/* Top Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: '#e0e0e0', mb: 3 }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.95rem',
              color: '#555',
              mr: 2,
            },
            '& .Mui-selected': {
              color: '#008080 !important',
              fontWeight: 600,
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#008080',
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
          {/* Left Column Card: P Kumar Summary */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#222' }}>
                {personalInfo.name}
              </Typography>
              <Stack spacing={2.5}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <MailIcon sx={{ color: '#1976d2' }} />
                  <Typography variant="body2" sx={{ color: '#444' }}>
                    {personalInfo.email}
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PhoneIphoneIcon sx={{ color: '#1976d2' }} />
                  <Typography variant="body2" sx={{ color: '#444' }}>
                    (+91) {personalInfo.phone}
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LocationOnIcon sx={{ color: '#1976d2' }} />
                  <Typography variant="body2" sx={{ color: '#444' }}>
                    {personalInfo.address}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>

          {/* Right Column Card: About me & Details */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#222' }}>
                About me
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6, mb: 3 }}>
                {personalInfo.bio}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#222' }}>
                Details
              </Typography>

              <Grid container spacing={2} sx={{ mb: 1 }}>
                <Grid size={{ xs: 4 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#444' }}>
                    Full Name:
                  </Typography>
                </Grid>
                <Grid size={{ xs: 8 }}>
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    Albert Eintein
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 1.5 }} />

              <Grid container spacing={2} sx={{ mb: 1 }}>
                <Grid size={{ xs: 4 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#444' }}>
                    Father's Name:
                  </Typography>
                </Grid>
                <Grid size={{ xs: 8 }}>
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    Sr. Albert Eintein
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 1.5 }} />

              <Grid container spacing={2} sx={{ mb: 1 }}>
                <Grid size={{ xs: 4 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#444' }}>
                    Address:
                  </Typography>
                </Grid>
                <Grid size={{ xs: 8 }}>
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    Patna, India
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 1.5 }} />

              <Grid container spacing={2} sx={{ mb: 1 }}>
                <Grid size={{ xs: 4 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#444' }}>
                    Zip Code:
                  </Typography>
                </Grid>
                <Grid size={{ xs: 8 }}>
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    809990
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 1.5 }} />

              <Grid container spacing={2}>
                <Grid size={{ xs: 4 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#444' }}>
                    Website:
                  </Typography>
                </Grid>
                <Grid size={{ xs: 8 }}>
                  <Link href="https://trickuweb.com" target="_blank" underline="hover" sx={{ color: '#1976d2' }}>
                    https://trickuweb.com
                  </Link>
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
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#333' }}>
                  Personal Information
                </Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid size={{ xs: 6 }}>
                    <TextField
                      label="Name"
                      value={personalInfo.name}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <TextField
                      label="Location"
                      value={personalInfo.location}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <TextField
                  label="Bio"
                  multiline
                  rows={3}
                  value={personalInfo.bio}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, bio: e.target.value })}
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 3 }}
                />
                <TextField
                  select
                  label="User Type"
                  value={personalInfo.userType}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, userType: e.target.value })}
                  fullWidth
                  variant="outlined"
                  sx={{ width: 220 }}
                >
                  <MenuItem value="Super Admin">Super Admin</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Editor">Editor</MenuItem>
                </TextField>
              </Card>
            </Grid>

            {/* Card 2: Contact Information */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#333' }}>
                  Contact Information
                </Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid size={{ xs: 6 }}>
                    <TextField
                      label="Contact Phone"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <TextField
                      label="Email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <TextField
                  label="Profile URL"
                  value={personalInfo.profileUrl}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, profileUrl: e.target.value })}
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 3 }}
                />
                <TextField
                  label="Address"
                  multiline
                  rows={3}
                  value={personalInfo.address}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                  fullWidth
                  variant="outlined"
                />
              </Card>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
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
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#333' }}>
              General Setting
            </Typography>
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Username"
                  value={accountInfo.username}
                  onChange={(e) => setAccountInfo({ ...accountInfo, username: e.target.value })}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Account Email"
                  value={accountInfo.accountEmail}
                  onChange={(e) => setAccountInfo({ ...accountInfo, accountEmail: e.target.value })}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  select
                  label="User Type"
                  value={accountInfo.userType}
                  onChange={(e) => setAccountInfo({ ...accountInfo, userType: e.target.value })}
                  fullWidth
                  variant="outlined"
                >
                  <MenuItem value="Super Admin">Super Admin</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  select
                  label="Location"
                  value={accountInfo.location}
                  onChange={(e) => setAccountInfo({ ...accountInfo, location: e.target.value })}
                  fullWidth
                  variant="outlined"
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
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
              Advance Setting
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Assign responsibility
            </Typography>
            <Stack spacing={1} sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={switches.gilad}
                    onChange={handleSwitchChange}
                    name="gilad"
                    color="primary"
                  />
                }
                label="Gilad Gray"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={switches.jason}
                    onChange={handleSwitchChange}
                    name="jason"
                    color="primary"
                  />
                }
                label="Jason Killian"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={switches.antoine}
                    onChange={handleSwitchChange}
                    name="antoine"
                    color="primary"
                  />
                }
                label="Antoine Llorca"
              />
            </Stack>
            <Typography variant="caption" color="text.secondary">
              Be careful
            </Typography>
          </Card>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSaveAlert('Account Updated!', 'Your account settings have been saved.')}
              startIcon={<SaveIcon />}
              sx={{ px: 4, py: 1.2, fontWeight: 700, borderRadius: 1.5 }}
            >
              Save Account Settings
            </Button>
          </Box>
        </Stack>
      )}

      {/* Tab 3: Change Password */}
      {tabIndex === 3 && (
        <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', maxWidth: 600 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#333' }}>
            Change Password
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              if (passwords.newPass && passwords.newPass === passwords.confirm) {
                handleSaveAlert('Password Changed!', 'Your password has been updated.');
                setPasswords({ current: '', newPass: '', confirm: '' });
              } else {
                Swal.fire('Error', 'New passwords do not match.', 'error');
              }
            }}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
          >
            <TextField
              label="Current Password"
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              label="New Password"
              type="password"
              value={passwords.newPass}
              onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Confirm New Password"
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              required
              fullWidth
              variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary" sx={{ width: 180, py: 1.2, fontWeight: 700 }}>
              Update Password
            </Button>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default Settings;