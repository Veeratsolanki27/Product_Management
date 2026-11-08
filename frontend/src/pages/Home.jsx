import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import RefreshIcon from '@mui/icons-material/Refresh';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const allChartData = [
  { year: '2014', Sales: 1000, Expenses: 400, Profit: 200 },
  { year: '2015', Sales: 1170, Expenses: 460, Profit: 250 },
  { year: '2016', Sales: 660, Expenses: 1120, Profit: 300 },
  { year: '2017', Sales: 1030, Expenses: 540, Profit: 350 },
  { year: '2018', Sales: 200, Expenses: 400, Profit: 200 },
  { year: '2019', Sales: 370, Expenses: 450, Profit: 250 },
  { year: '2020', Sales: 460, Expenses: 1150, Profit: 320 },
  { year: '2021', Sales: 1180, Expenses: 240, Profit: 250 },
];

const formatYAxis = (tickItem) => {
  if (tickItem === 0) return '0';
  if (tickItem === 500) return '500';
  if (tickItem === 1000) return '1K';
  if (tickItem === 1500) return '1.5K';
  return tickItem;
};

const Home = () => {
  const [expanded, setExpanded] = useState('panel1');
  const [yearFilter, setYearFilter] = useState('All');
  const [chartData, setChartData] = useState(allChartData);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleFilterChange = (filter) => {
    setYearFilter(filter);
    if (filter === '2014-2017') {
      setChartData(allChartData.slice(0, 4));
    } else if (filter === '2018-2021') {
      setChartData(allChartData.slice(4, 8));
    } else {
      setChartData(allChartData);
    }
  };

  const handleRefresh = () => {
    setYearFilter('All');
    setChartData(allChartData);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* ROW 1: TOP 4 STAT SUMMARY CARDS (Spans 100% full width) */}
      <Grid container spacing={2.5} sx={{ width: '100%', m: 0 }}>
        {/* Card 1: $500 Total Earning */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ pt: '0 !important', pl: '0 !important', pr: 1.25 }}>
          <Card
            sx={{
              height: 155,
              background: 'linear-gradient(135deg, Get-Location#1b264f 0%, #232c66 50%, #151a3d 100%)',
              color: '#ffffff',
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: 2.5,
              transition: 'transform 0.2s, boxShadow 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CreditCardIcon sx={{ fontSize: 28, color: '#ffffff' }} />
              <Chip label="+12.5%" size="small" sx={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.75rem', height: 22 }} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.2, fontSize: '1.95rem' }}>
                $500
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem' }}>
                Total Earning
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Card 2: $900 Total Order */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ pt: '0 !important', px: 1.25 }}>
          <Card
            sx={{
              height: 155,
              background: 'linear-gradient(135deg, #2b7a78 0%, #3ca08d 50%, #206e61 100%)',
              color: '#ffffff',
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: 2.5,
              transition: 'transform 0.2s, boxShadow 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <ShoppingBagIcon sx={{ fontSize: 28, color: '#ffffff' }} />
              <Chip label="+8.4%" size="small" sx={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.75rem', height: 22 }} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.2, fontSize: '1.95rem' }}>
                $900
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem' }}>
                Total Order
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Card 3 & 4 Stacked: $203k Total Income */}
        <Grid size={{ xs: 12, md: 4 }} sx={{ pt: '0 !important', pl: 1.25, pr: '0 !important' }}>
          <Stack spacing={1.2} sx={{ height: 155, justifyContent: 'space-between' }}>
            {/* Top Small Card (Green) */}
            <Card
              sx={{
                height: 72,
                background: 'linear-gradient(135deg, #3da872 0%, #46b97e 100%)',
                color: '#ffffff',
                borderRadius: 2,
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                px: 2.5,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.01)' },
              }}
            >
              <Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Box
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: 1.5,
                      p: 0.8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <StorefrontIcon sx={{ fontSize: 24, color: '#ffffff' }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.1 }}>
                      $203k
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.75rem' }}>
                      Total Income
                    </Typography>
                  </Box>
                </Stack>
                <Chip label="Q3" size="small" sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.7rem', height: 20 }} />
              </Stack>
            </Card>

            {/* Bottom Small Card (White) */}
            <Card
              sx={{
                height: 72,
                backgroundColor: '#ffffff',
                color: '#333333',
                borderRadius: 2,
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                px: 2.5,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.01)' },
              }}
            >
              <Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Box
                    sx={{
                      backgroundColor: '#eef2f6',
                      borderRadius: 1.5,
                      p: 0.8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <StorefrontIcon sx={{ fontSize: 24, color: '#333333' }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.1 }}>
                      $203k
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                      Total Income
                    </Typography>
                  </Box>
                </Stack>
                <Chip label="Q4" size="small" variant="outlined" sx={{ fontSize: '0.7rem', height: 20 }} />
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* ROW 2: COMPANY PERFORMANCE CHART (LEFT 65%) & POPULAR PRODUCTS (RIGHT 35%) */}
      <Grid container spacing={2.5} sx={{ width: '100%', m: 0 }}>
        {/* Left Column: Company Performance Bar Chart */}
        <Grid size={{ xs: 12, md: 7, lg: 7.5 }} sx={{ pt: '0 !important', pl: '0 !important', pr: 1.25 }}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              p: 3,
              height: '100%',
              minHeight: 450,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#444444', fontSize: '1.15rem' }}>
                  Company Performance
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                  Sales, Expenses, and Profit: {yearFilter === 'All' ? '2014-2021' : yearFilter}
                </Typography>
              </Box>

              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <ButtonGroup size="small" variant="outlined">
                  <Button
                    variant={yearFilter === 'All' ? 'contained' : 'outlined'}
                    onClick={() => handleFilterChange('All')}
                  >
                    All
                  </Button>
                  <Button
                    variant={yearFilter === '2014-2017' ? 'contained' : 'outlined'}
                    onClick={() => handleFilterChange('2014-2017')}
                  >
                    2014-17
                  </Button>
                  <Button
                    variant={yearFilter === '2018-2021' ? 'contained' : 'outlined'}
                    onClick={() => handleFilterChange('2018-2021')}
                  >
                    2018-21
                  </Button>
                </ButtonGroup>
                <Tooltip title="Reset View">
                  <IconButton size="small" onClick={handleRefresh}>
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>

            <Box sx={{ width: '100%', height: 370 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: -10, bottom: 25 }}
                  barGap={6}
                >
                  <CartesianGrid stroke="#eee" vertical={false} />
                  <XAxis
                    dataKey="year"
                    tickLine={false}
                    axisLine={{ stroke: '#ddd' }}
                    label={{
                      value: 'Year',
                      position: 'bottom',
                      offset: 10,
                      style: { fill: '#666', fontSize: 13 },
                    }}
                  />
                  <YAxis
                    tickFormatter={formatYAxis}
                    ticks={[0, 500, 1000, 1500]}
                    domain={[0, 1500]}
                    tickLine={false}
                    axisLine={{ stroke: '#ddd' }}
                  />
                  <RechartsTooltip />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ paddingLeft: 20 }}
                    iconType="square"
                  />
                  <Bar dataKey="Sales" fill="#2ca09b" barSize={16} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="Expenses" fill="#231976" barSize={16} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="Profit" fill="#2e7d32" barSize={16} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

        {/* Right Column: Popular Products Accordion */}
        <Grid size={{ xs: 12, md: 5, lg: 4.5 }} sx={{ pt: '0 !important', pl: 1.25, pr: '0 !important' }}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              p: 3,
              height: '100%',
              minHeight: 450,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333333', mb: 2.5, fontSize: '1.15rem' }}>
              Popular Products
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleAccordionChange('panel1')}
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px !important',
                  boxShadow: 'none',
                  '&:before': { display: 'none' },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#666' }} />}>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.95rem', color: '#333' }}>
                    Accordion 1
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    Detailed insights and specifications for Popular Product 1.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === 'panel2'}
                onChange={handleAccordionChange('panel2')}
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px !important',
                  boxShadow: 'none',
                  '&:before': { display: 'none' },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#666' }} />}>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.95rem', color: '#333' }}>
                    Accordion 2
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    Detailed insights and performance statistics for Product 2.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === 'panel3'}
                onChange={handleAccordionChange('panel3')}
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px !important',
                  boxShadow: 'none',
                  '&:before': { display: 'none' },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#666' }} />}>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.95rem', color: '#333' }}>
                    Accordion 2
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    Detailed product category overview and customer metrics.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === 'panel4'}
                onChange={handleAccordionChange('panel4')}
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px !important',
                  boxShadow: 'none',
                  '&:before': { display: 'none' },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#666' }} />}>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.95rem', color: '#333' }}>
                    Accordion 2
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    Detailed inventory and order distribution figures.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;