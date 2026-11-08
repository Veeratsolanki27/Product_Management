import React, { useState, useEffect } from 'react';
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
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import RefreshIcon from '@mui/icons-material/Refresh';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
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
import { getOrders, getProducts, getCustomers } from '../services/api';

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

  // Live dynamic data from Backend
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    Promise.all([
      getOrders().catch(() => []),
      getProducts().catch(() => []),
      getCustomers().catch(() => []),
    ]).then(([ordersData, productsData, customersData]) => {
      setOrders(ordersData);
      setProducts(productsData);
      setCustomers(customersData);
    });
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? (o.total || 0) : 0), 0);
  const totalOrdersCount = orders.length;
  const completedOrdersCount = orders.filter((o) => o.status === 'Completed').length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Processing').length;

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

  // Popular products with realistic detail
  const popularProductsList = [
    {
      id: 'panel1',
      title: 'Samsung 55" 4K Smart TV',
      category: 'Electronics',
      price: '₹90,000',
      salesCount: '1,420 Sold',
      rating: '4.8 ★',
      inStock: '84 Units in stock',
      percentage: 85,
      desc: 'Top-selling 4K UHD display with HDR10+ and Dolby Atmos. 98% customer satisfaction rate with high repeat loyalty.'
    },
    {
      id: 'panel2',
      title: 'HP Spectre x360 Convertible',
      category: 'Laptop',
      price: '₹99,999',
      salesCount: '890 Sold',
      rating: '4.7 ★',
      inStock: '42 Units in stock',
      percentage: 72,
      desc: 'High performance Intel Core i7 processor with OLED touchscreen and 16-hour battery life. Best in premium category.'
    },
    {
      id: 'panel3',
      title: 'OnePlus 12 Advance 5G',
      category: 'Mobile',
      price: '₹80,000',
      salesCount: '2,150 Sold',
      rating: '4.9 ★',
      inStock: '110 Units in stock',
      percentage: 92,
      desc: 'Flagship Snapdragon chipset with 100W SuperVOOC fast charging and Hasselblad tuned camera system.'
    },
    {
      id: 'panel4',
      title: 'Havells High-Speed Air Fan',
      category: 'Home Appliances',
      price: '₹2,000',
      salesCount: '3,800 Sold',
      rating: '4.6 ★',
      inStock: '215 Units in stock',
      percentage: 95,
      desc: 'Energy efficient aerodynamic blade motor with whisper-quiet operation. Consistent recurring daily sales volume.'
    }
  ];

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* ROW 1: TOP 4 STAT SUMMARY CARDS (Spans 100% full width) */}
      <Grid container spacing={2.5} sx={{ width: '100%', m: 0 }}>
        {/* Card 1: Total Revenue */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ pt: '0 !important', pl: '0 !important', pr: 1.25 }}>
          <Card
            sx={{
              height: 155,
              background: 'linear-gradient(135deg, #1b264f 0%, #232c66 50%, #151a3d 100%)',
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
              <Chip label="+14.8%" size="small" sx={{ backgroundColor: 'rgba(255,255,255,0.18)', color: '#fff', fontSize: '0.75rem', height: 22 }} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.2, fontSize: '1.95rem' }}>
                ₹{totalRevenue > 0 ? totalRevenue.toLocaleString() : '3,55,500'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.85rem' }}>
                Total Revenue
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Card 2: Total Orders */}
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
              <Chip label={`${completedOrdersCount} Fulfilled`} size="small" sx={{ backgroundColor: 'rgba(255,255,255,0.18)', color: '#fff', fontSize: '0.75rem', height: 22 }} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.2, fontSize: '1.95rem' }}>
                {totalOrdersCount > 0 ? totalOrdersCount : '7'} Orders
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.85rem' }}>
                Total Active Orders ({pendingOrdersCount} Processing)
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Card 3 & 4 Stacked: Total Products & Active Customers (Beside Total Orders) */}
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
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.15rem', lineHeight: 1.1 }}>
                      {products.length > 0 ? products.length : 6} Items
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.75rem' }}>
                      Catalog Inventory
                    </Typography>
                  </Box>
                </Stack>
                <Chip label="Live" size="small" sx={{ backgroundColor: 'rgba(255,255,255,0.25)', color: '#fff', fontSize: '0.7rem', height: 20 }} />
              </Stack>
            </Card>

            {/* Bottom Small Card: Customers */}
            <Card
              sx={{
                height: 72,
                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
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
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      borderRadius: 1.5,
                      p: 0.8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TrendingUpIcon sx={{ fontSize: 24, color: '#ffffff' }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.15rem', lineHeight: 1.1 }}>
                      {customers.length > 0 ? customers.length : 6} Clients
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.75rem' }}>
                      Registered Customers
                    </Typography>
                  </Box>
                </Stack>
                <Chip label="CRM" size="small" sx={{ backgroundColor: 'rgba(255,255,255,0.25)', color: '#fff', fontSize: '0.7rem', height: 20 }} />
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* ROW 2: COMPANY PERFORMANCE CHART & POPULAR PRODUCTS */}
      <Grid container spacing={2.5} sx={{ width: '100%', m: 0 }}>
        {/* Left Column: Company Performance Bar Chart */}
        <Grid size={{ xs: 12, md: 7, lg: 7.5 }} sx={{ pt: '0 !important', pl: '0 !important', pr: 1.25 }}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              p: 3,
              height: '100%',
              minHeight: 490,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '1.15rem' }}>
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

            <Box sx={{ width: '100%', height: 390 }}>
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

        {/* Right Column: Popular Products Accordion with Rich Content */}
        <Grid size={{ xs: 12, md: 5, lg: 4.5 }} sx={{ pt: '0 !important', pl: 1.25, pr: '0 !important' }}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              p: 3,
              height: '100%',
              minHeight: 490,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '1.15rem' }}>
                Popular Products
              </Typography>
              <Chip label="Top 4 Best Sellers" color="success" size="small" variant="outlined" />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {popularProductsList.map((item) => (
                <Accordion
                  key={item.id}
                  expanded={expanded === item.id}
                  onChange={handleAccordionChange(item.id)}
                  sx={{
                    border: '1px solid',
                    borderColor: expanded === item.id ? 'primary.main' : 'divider',
                    borderRadius: '8px !important',
                    boxShadow: expanded === item.id ? '0 4px 12px rgba(25,118,210,0.08)' : 'none',
                    transition: 'all 0.2s',
                    '&:before': { display: 'none' },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'text.secondary' }} />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', pr: 1.5 }}>
                      <Box>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.92rem', color: 'text.primary' }}>
                          {item.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.category} • <b style={{ color: '#2e7d32' }}>{item.price}</b>
                        </Typography>
                      </Box>
                      <Chip label={item.rating} size="small" sx={{ height: 22, fontSize: '0.75rem', fontWeight: 600, bgcolor: '#fff3e0', color: '#e65100' }} />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0, pb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontSize: '0.85rem' }}>
                      {item.desc}
                    </Typography>
                    <Box sx={{ mb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">Sales Target</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>{item.percentage}%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={item.percentage} sx={{ height: 6, borderRadius: 3 }} />
                    </Box>
                    <Stack direction="row" spacing={1} sx={{ mt: 1.5, justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip icon={<CheckCircleIcon fontSize="small" />} label={item.inStock} size="small" variant="outlined" color="primary" sx={{ fontSize: '0.72rem' }} />
                      <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        {item.salesCount}
                      </Typography>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
