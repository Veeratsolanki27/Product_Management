import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
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
} from 'recharts';

const populationData = [
  { city: 'New York City, NY', pop2010: 8175133, pop2000: 8008278 },
  { city: 'Los Angeles, CA', pop2010: 3792621, pop2000: 3694820 },
  { city: 'Chicago, IL', pop2010: 2695598, pop2000: 2896016 },
  { city: 'Houston, TX', pop2010: 2099451, pop2000: 1953631 },
  { city: 'Philadelphia, PA', pop2010: 1526006, pop2000: 1517550 },
];

const dailyActivitiesData = [
  { name: 'Work', value: 45.8, color: '#2ca09b' },
  { name: 'Sleep', value: 29.2, color: '#2e7d32' },
  { name: 'Watch TV', value: 8.4, color: '#ffb300' },
  { name: 'Commute', value: 8.3, color: '#ed6c02' },
  { name: 'Eat', value: 8.3, color: '#1a237e' },
];

const formatPopulation = (val) => {
  if (val === 0) return '0';
  if (val === 2500000) return '2,500,000';
  if (val === 5000000) return '5,000,000';
  if (val === 7500000) return '7,500,000';
  if (val === 10000000) return '10,000,000';
  return val.toLocaleString();
};

const WorldMapVector = () => (
  <Box sx={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 1 }}>
    {/* Realistic Clean Vector World Map SVG matching user reference screenshot */}
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', py: 0.5 }}>
      <svg viewBox="0 0 1000 480" width="100%" height="270" style={{ maxWidth: '850px' }}>
        <g stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round">
          {/* Greenland - Soft Light Green */}
          <path d="M300,40 L380,30 L400,90 L340,110 L290,70 Z" fill="#d2e8d2" />

          {/* North America / Canada / USA - Light Medium Green */}
          <path d="M100,80 L280,60 L340,110 L350,180 L290,230 L160,210 L80,140 Z" fill="#a4d4a4" />
          {/* Mexico & Central America */}
          <path d="M160,210 L250,220 L230,270 L170,250 Z" fill="#b8e2ba" />

          {/* South America - Light Medium Green */}
          <path d="M250,260 L350,280 L330,430 L270,450 L220,360 Z" fill="#b8e2ba" />

          {/* Europe / UK & Western Europe - Vivid Medium Green */}
          <path d="M460,90 L570,80 L590,145 L500,170 L440,135 Z" fill="#52b752" />

          {/* Africa & Madagascar - Soft Light Green */}
          <path d="M440,175 L560,185 L540,350 L460,370 L410,270 Z" fill="#d0ead1" />
          <path d="M570,320 L585,310 L580,350 L565,360 Z" fill="#d0ead1" />

          {/* Russia & Northern Eurasia - Deep Vivid Green (Highest Density) */}
          <path d="M570,60 L890,50 L920,150 L730,170 L560,135 Z" fill="#3ea575" />

          {/* Middle East & Central Asia - Muted Green */}
          <path d="M560,145 L690,155 L700,230 L610,245 L550,195 Z" fill="#88ce8a" />

          {/* India - Dark Green Highlight (Exact match to screenshot) */}
          <path d="M685,195 L745,205 L735,280 L675,245 Z" fill="#1b7837" stroke="#0f4720" strokeWidth="2" />

          {/* China, Japan & East Asia - Vivid Green */}
          <path d="M720,155 L860,160 L880,250 L760,270 L695,215 Z" fill="#52b752" />
          <path d="M890,170 L910,165 L900,210 L885,200 Z" fill="#52b752" />

          {/* Australia & New Zealand - Light Green */}
          <path d="M780,290 L890,280 L920,350 L830,390 L760,340 Z" fill="#b8e2ba" />
        </g>
      </svg>
    </Box>

    {/* Map Density Gradient Legend Bar (Matching screenshot bottom-left) */}
    <Stack direction="row" spacing={1.5} sx={{ px: 2, pb: 0.5, alignItems: 'center' }}>
      <Typography variant="caption" sx={{ color: '#555', fontWeight: 600 }}>
        200
      </Typography>
      <Box
        sx={{
          width: 220,
          height: 12,
          borderRadius: 1,
          background: 'linear-gradient(to right, #d0ead1 0%, #3ea575 50%, #1b7837 100%)',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
        }}
      />
      <Typography variant="caption" sx={{ color: '#555', fontWeight: 600 }}>
        1,100
      </Typography>
    </Stack>
  </Box>
);

const Analytics = () => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* ROW 1: TOP 50% LEFT (2x2 VISITORS CARDS) & TOP 50% RIGHT (POPULATION HORIZONTAL BAR CHART) */}
      <Box
        sx={{
          display: 'flex',
          gap: 2.5,
          width: '100%',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'stretch',
        }}
      >
        {/* Left Side: 2x2 Grid of Visitors Cards (50% Width) */}
        <Box sx={{ width: { xs: '100%', md: '50%' }, flexShrink: 0 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
              height: '100%',
            }}
          >
            {/* Top Left Card (Navy Purple) */}
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
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                Visitors
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '1.9rem' }}>
                22000
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>
                Since last week
              </Typography>
            </Card>

            {/* Top Right Card (Teal/Green) */}
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
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                Visitors
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '1.9rem' }}>
                22000
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>
                Since last week
              </Typography>
            </Card>

            {/* Bottom Left Card (Navy Purple) */}
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
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                Visitors
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '1.9rem' }}>
                20000
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>
                Since last week
              </Typography>
            </Card>

            {/* Bottom Right Card (Teal/Green) */}
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
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                Visitors
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '1.9rem' }}>
                32000
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>
                Since last week
              </Typography>
            </Card>
          </Box>
        </Box>

        {/* Right Side: Population of Largest U.S. Cities Horizontal Bar Chart (50% Width) */}
        <Box sx={{ width: { xs: '100%', md: '50%' }, flexShrink: 0 }}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              p: 2.5,
              height: 286,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333333', textAlign: 'center', mb: 0.5 }}>
              Population of Largest U.S. Cities
            </Typography>

            <Box sx={{ width: '100%', height: 230 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={populationData}
                  margin={{ top: 5, right: 20, left: 125, bottom: 25 }}
                  barGap={3}
                >
                  <CartesianGrid stroke="#eee" horizontal={false} />
                  <XAxis
                    type="number"
                    tickFormatter={formatPopulation}
                    ticks={[0, 2500000, 5000000, 7500000, 10000000]}
                    domain={[0, 10000000]}
                    axisLine={{ stroke: '#ddd' }}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#666' }}
                    label={{
                      value: 'Total Population',
                      position: 'bottom',
                      offset: 8,
                      style: { fill: '#666', fontSize: 11, fontStyle: 'italic' },
                    }}
                  />
                  <YAxis
                    type="category"
                    dataKey="city"
                    axisLine={{ stroke: '#ddd' }}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#444' }}
                    label={{
                      value: 'City',
                      angle: -90,
                      position: 'insideLeft',
                      offset: -120,
                      style: { fill: '#666', fontSize: 11 },
                    }}
                  />
                  <Tooltip formatter={(value) => value.toLocaleString()} />
                  <Legend
                    layout="vertical"
                    verticalAlign="top"
                    align="right"
                    iconType="square"
                    wrapperStyle={{ fontSize: 11 }}
                  />
                  <Bar dataKey="pop2010" name="2010 Population" fill="#2ca09b" barSize={9} radius={[0, 2, 2, 0]} />
                  <Bar dataKey="pop2000" name="2000 Population" fill="#231976" barSize={9} radius={[0, 2, 2, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Box>
      </Box>

      {/* ROW 2: WORLD DENSITY MAP (LEFT 65%) & MY DAILY ACTIVITIES DONUT CHART (RIGHT 35%) */}
      <Box
        sx={{
          display: 'flex',
          gap: 2.5,
          width: '100%',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'stretch',
        }}
      >
        {/* Left Side: Vector World Map Density Chart (65% Width) */}
        <Box sx={{ width: { xs: '100%', md: '65%' }, flexShrink: 0 }}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              p: 2.5,
              height: 360,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <WorldMapVector />
          </Card>
        </Box>

        {/* Right Side: My Daily Activities Donut Chart (35% Width) */}
        <Box sx={{ width: { xs: '100%', md: '35%' }, flexShrink: 0 }}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              p: 2.5,
              height: 360,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333333', textAlign: 'center', mb: 1 }}>
              My Daily Activities
            </Typography>

            <Box sx={{ width: '100%', height: 290, display: 'flex', alignItems: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dailyActivitiesData}
                    cx="40%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    dataKey="value"
                    paddingAngle={3}
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
                    wrapperStyle={{ fontSize: 12, paddingLeft: 10 }}
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
