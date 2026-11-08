import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PublicIcon from '@mui/icons-material/Public';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';

const populationData = [
  { city: 'New York City, NY', pop2010: 8175133, pop2000: 8008278 },
  { city: 'Los Angeles, CA', pop2010: 3792621, pop2000: 3694820 },
  { city: 'Chicago, IL', pop2010: 2695598, pop2000: 2896016 },
  { city: 'Houston, TX', pop2010: 2099451, pop2000: 1953631 },
  { city: 'Philadelphia, PA', pop2010: 1526006, pop2000: 1517550 },
];

const regionalGrowthData = [
  { region: 'North America', sales: 48500, orders: 1240, growth: '+24%' },
  { region: 'Europe', sales: 34200, orders: 860, growth: '+18%' },
  { region: 'Asia Pacific', sales: 62800, orders: 1950, growth: '+35%' },
  { region: 'Latin America', sales: 18400, orders: 490, growth: '+12%' },
  { region: 'Middle East', sales: 15100, orders: 380, growth: '+15%' },
];

const trafficTrendData = [
  { month: 'Jan', visitors: 14000, bounce: 38 },
  { month: 'Feb', visitors: 16500, bounce: 35 },
  { month: 'Mar', visitors: 19000, bounce: 32 },
  { month: 'Apr', visitors: 22000, bounce: 30 },
  { month: 'May', visitors: 20500, bounce: 31 },
  { month: 'Jun', visitors: 25000, bounce: 28 },
  { month: 'Jul', visitors: 28500, bounce: 26 },
];

const dailyActivitiesData = [
  { name: 'Online Direct', value: 45.8, color: '#1976d2' },
  { name: 'Organic Search', value: 29.2, color: '#2e7d32' },
  { name: 'Social Referral', value: 12.4, color: '#ed6c02' },
  { name: 'Email Campaign', value: 8.3, color: '#9c27b0' },
  { name: 'Affiliate', value: 4.3, color: '#00838f' },
];

const formatPopulation = (val) => {
  if (val === 0) return '0';
  if (val === 2500000) return '2.5M';
  if (val === 5000000) return '5M';
  if (val === 7500000) return '7.5M';
  if (val === 10000000) return '10M';
  return (val / 1000000).toFixed(1) + 'M';
};

const Analytics = () => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* ROW 1: TOP 50% LEFT (2x2 VISITORS CARDS) & TOP 50% RIGHT (POPULATION BAR CHART) */}
      <Box
        sx={{
          display: 'flex',
          gap: 2.5,
          width: '100%',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'stretch',
        }}
      >
        {/* Left Side: 2x2 Grid of Visitors / Performance Cards */}
        <Box sx={{ width: { xs: '100%', md: '50%' }, flexShrink: 0 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
              height: '100%',
            }}
          >
            {/* Card 1 */}
            <Card
              sx={{
                height: 135,
                background: 'linear-gradient(135deg, #1b264f 0%, #232c66 50%, #151a3d 100%)',
                color: '#ffffff',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                p: 2.5,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                  Total Visitors
                </Typography>
                <Chip label="+18.2%" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#fff', height: 20, fontSize: '0.7rem' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '1.9rem' }}>
                28,500
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>
                Active monthly audience
              </Typography>
            </Card>

            {/* Card 2 */}
            <Card
              sx={{
                height: 135,
                background: 'linear-gradient(135deg, #2b7a78 0%, #3ca08d 50%, #206e61 100%)',
                color: '#ffffff',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                p: 2.5,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                  Conversion Rate
                </Typography>
                <Chip label="+4.6%" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#fff', height: 20, fontSize: '0.7rem' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '1.9rem' }}>
                3.42%
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>
                Above e-commerce average
              </Typography>
            </Card>

            {/* Card 3 */}
            <Card
              sx={{
                height: 135,
                background: 'linear-gradient(135deg, #4568dc 0%, #b06ab3 100%)',
                color: '#ffffff',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                p: 2.5,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                  Avg Order Value
                </Typography>
                <Chip label="+11%" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#fff', height: 20, fontSize: '0.7rem' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '1.9rem' }}>
                ₹50,780
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>
                Per checkout session
              </Typography>
            </Card>

            {/* Card 4 */}
            <Card
              sx={{
                height: 135,
                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                color: '#ffffff',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                p: 2.5,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                  Repeat Orders
                </Typography>
                <Chip label="High" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#fff', height: 20, fontSize: '0.7rem' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '1.9rem' }}>
                41.8%
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>
                Customer retention metric
              </Typography>
            </Card>
          </Box>
        </Box>

        {/* Right Side: City Population Comparison */}
        <Box sx={{ width: { xs: '100%', md: '50%' }, flexShrink: 0 }}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              p: 2.5,
              height: 290,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Population of Major US Cities
              </Typography>
              <Chip label="Comparative" size="small" variant="outlined" />
            </Box>

            <Box sx={{ width: '100%', height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={populationData}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 25, bottom: 5 }}
                >
                  <CartesianGrid stroke="#eee" horizontal={false} />
                  <XAxis
                    type="number"
                    tickFormatter={formatPopulation}
                    ticks={[0, 2500000, 5000000, 7500000, 10000000]}
                    domain={[0, 10000000]}
                    tickLine={false}
                    axisLine={{ stroke: '#ddd' }}
                    style={{ fontSize: 11 }}
                  />
                  <YAxis
                    dataKey="city"
                    type="category"
                    tickLine={false}
                    axisLine={{ stroke: '#ddd' }}
                    style={{ fontSize: 11 }}
                  />
                  <Tooltip formatter={(val) => val.toLocaleString()} />
                  <Legend
                    layout="horizontal"
                    verticalAlign="top"
                    align="right"
                    iconType="square"
                    wrapperStyle={{ fontSize: 11 }}
                  />
                  <Bar dataKey="pop2010" name="2010 Population" fill="#2ca09b" barSize={10} radius={[0, 3, 3, 0]} />
                  <Bar dataKey="pop2000" name="2000 Population" fill="#231976" barSize={10} radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Box>
      </Box>

      {/* ROW 2: CLEAN REGIONAL TRAFFIC & SALES (REPLACING OLD GREEN SPOT MAP) & CHANNELS DONUT */}
      <Box
        sx={{
          display: 'flex',
          gap: 2.5,
          width: '100%',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'stretch',
        }}
      >
        {/* Left Side: Modern Regional Sales & Visitors Trend Chart (Clean high-fidelity chart instead of the green map) */}
        <Box sx={{ width: { xs: '100%', md: '65%' }, flexShrink: 0 }}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              p: 2.5,
              height: 380,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, flexWrap: 'wrap' }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PublicIcon sx={{ color: 'primary.main', fontSize: 22 }} />
                  Global Traffic & Visitor Growth Trend
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                  Monthly website unique visitors vs bounce rate performance
                </Typography>
              </Box>
              <Chip label="7-Month Horizon" size="small" color="primary" variant="outlined" />
            </Box>

            {/* Smooth High-Fidelity Area Chart */}
            <Box sx={{ width: '100%', height: 210 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficTrendData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1976d2" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#1976d2" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tickLine={false} style={{ fontSize: 12 }} />
                  <YAxis tickLine={false} style={{ fontSize: 11 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="visitors" name="Visitors" stroke="#1976d2" strokeWidth={2.5} fillOpacity={1} fill="url(#visitorGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>

            {/* Regional Performance Mini-Summary Bar */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
              {regionalGrowthData.map((item) => (
                <Box key={item.region} sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', noWrap: true, fontSize: '0.72rem' }}>
                    {item.region}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.88rem' }}>
                    ₹{(item.sales / 1000).toFixed(0)}k
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600, fontSize: '0.7rem' }}>
                    {item.growth}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Box>

        {/* Right Side: Channel Distribution Donut Chart */}
        <Box sx={{ width: { xs: '100%', md: '35%' }, flexShrink: 0 }}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              p: 2.5,
              height: 380,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
                <PieChartIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                Channel Distribution
              </Typography>
              <Chip label="Top 5" size="small" variant="outlined" />
            </Box>

            <Box sx={{ width: '100%', height: 290, display: 'flex', alignItems: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dailyActivitiesData}
                    cx="42%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={88}
                    dataKey="value"
                    paddingAngle={4}
                  >
                    {dailyActivitiesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    iconType="circle"
                    wrapperStyle={{ fontSize: 11, paddingLeft: 8 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Analytics;
