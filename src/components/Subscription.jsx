import { Bedtime, CheckCircle, Facebook, Instagram, Language, LightMode, Restore, Star, SupportAgent, VerifiedUser } from '@mui/icons-material'
import { Alert, Box, Button, Card, CircularProgress, Container, Divider, Grid, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useThemeMode } from '../main'
import api from '../api'
import logo from "../assets/logo-png.png"
import logoDark from "../assets/logo-dark-png.png"
import i18n from '../i18n'
import { Link, useNavigate } from 'react-router-dom'

const Subscription = () => {

    const {t} = useTranslation();
    const {mode, setMode} = useThemeMode();
    const [anchorEl, setAnchorEl] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const open = Boolean(anchorEl);

    const handleFooterClick = (section) => {
        navigate("/", { state: { scrollTo: section } });
    };

    const handleOpenLang = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseLang = () => {
        setAnchorEl(null);
    };

    function handleChange() {
        setMode((prev) => prev === "light" ? "dark" : "light");
    }

    function handleLangChange(lang) {
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
        setAnchorEl(null);
        const isRTL = lang === "ar";
        document.documentElement.dir = isRTL ? "rtl" : "ltr";
    }
//   async function handleSubscription(priceId) {
//       try {
//         setLoading(true);
//         const response = await api.post("subscription", {
//             priceId: priceId,
//             successUrl: window.location.origin + "/success",
//             cancelUrl: window.location.origin + "/cancel"
//         });
//         const paymentUrl = response.data;
//         window.location.href = paymentUrl;
//       } catch (error) {
//           console.error(error);
//       } finally {
//         setLoading(false);
//       }
//   }
  return (
    <>
    <Box>
        <Box width={"100%"} height={"100px"} display={'flex'} alignItems={'center'}
        sx={{bgcolor: "background.paper"}}>
            <Container maxWidth="lg" sx={{display: "flex", justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Box component={"img"}
                src={mode === "light" ? logo : logoDark} width={"200px"} height={"60px"}
                sx={{objectFit: "contain", cursor: "pointer"}} onClick={() => navigate("/")}/>
                <Box display={'flex'} alignItems={"center"} gap={5}>
                <Box display={'flex'} alignItems={'center'} gap={2}>
                    <IconButton onClick={handleChange} sx={{transition: "0.2s ease-in-out"}}>
                        {mode === "light" ? <Bedtime/> : <LightMode/>}
                    </IconButton>
                    <Box display={'flex'} alignItems={'center'} gap={0} onClick={handleOpenLang}
                    sx={{cursor: "pointer"}}>
                        <IconButton>
                            <Language/>
                        </IconButton>
                        <Typography variant='body1' fontWeight={700} color='text.primary'>
                            {i18n.language === "en" && "EN"}
                            {i18n.language === "tr" && "TR"}
                            {i18n.language === "ar" && "AR"}
                        </Typography>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseLang}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        PaperProps={{
                            sx: {
                            minWidth: anchorEl?.clientWidth, // ✅ use clientWidth
                            },
                        }}
                    >
                        <MenuItem onClick={() => handleLangChange("en")}>English</MenuItem>
                        <MenuItem onClick={() => handleLangChange("tr")}>Türkçe</MenuItem>
                        <MenuItem onClick={() => handleLangChange("ar")}>العربية</MenuItem>
                    </Menu>
                </Box>
                <Button sx={{
                    height: "40px",
                    display: {xs: "none", md: "flex"}
                }} variant='outlined' startIcon={<SupportAgent/>}>
                    {t("landing.support")}
                </Button>
                </Box>
            </Container>
        </Box>
        <Box my={6}>
            <Container maxWidth="lg" sx={{display: "flex", justifyContent: "center"}}>
                <Box display={'flex'} alignItems={'center'} gap={2} p={4} sx={{
                    bgcolor: "primary.light", width: 'fit-content', borderRadius: 2,
                    boxShadow: (theme) =>
                    `0px 6px 20px ${theme.palette.primary.main}90`,
                    border: "1px solid", borderColor: "primary.main"
                }}>
                    <CheckCircle sx={{color: "primary.dark"}}/>
                    <Box>
                        <Typography variant='h6' fontWeight={700} color='primary.dark'>
                            {t("landing.subscription.success")}
                        </Typography>
                        <Typography variant='body1' color='primary.main'>
                            {t("landing.subscription.successDesc")}
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
        {/* pricing */}
            <Box id="pricing" py={5}>
                <Container maxWidth="lg">
                    <Typography variant='h4' fontWeight={700} textAlign={'center'}>
                        {t("landing.pricing.title")}
                    </Typography>
                    
                    <Grid container spacing={2} mt={5} alignItems={'flex-start'} justifyContent={'center'}>
                        <Grid size={{xs: 12, sm: 6, md: 4}}>
                            <Card sx={{width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
                                boxShadow: (theme) =>
                                    `0px 6px 20px ${theme.palette.primary.main}60`,
                                position: "relative"
                            }}>
                                <Typography variant='h5' fontWeight={700} textAlign={'center'} mt={5}>
                                    {t("landing.pricing.card.starterPlan")}
                                </Typography>
                                <Box textAlign={'center'}>
                                    <Typography variant='h5' fontWeight={700} textAlign={'center'}>
                                        7$
                                        <Typography display={'inline-block'} variant='body1' color='text.secondary'>
                                            {t("landing.pricing.card.perMonth")}
                                        </Typography>
                                    </Typography>
                                    <Typography variant='h5' color='text.secondary' fontWeight={700}>
                                        or
                                    </Typography>
                                    <Typography variant='h3' fontWeight={700} textAlign={'center'}>
                                        70$ 
                                        <Typography display={'inline-block'} variant='body1' color='text.secondary'>
                                            {t("landing.pricing.card.perYear")}
                                        </Typography>
                                    </Typography>
                                </Box>
                                <Box display={'flex'} alignItems={'center'} gap={1}
                                sx={{bgcolor: "primary.light", px: 2, py: 1, borderRadius: 2}}>
                                    <Star fontSize='12' sx={{color: mode === "light" ? "primary.main" : "#fff"}}/>
                                    <Typography variant='body1' sx={{color: mode === "light" ? "primary.main" : "#fff"}}>
                                        {t("landing.pricing.card.perYearLabel")} 
                                    </Typography>
                                </Box>
                                <Typography variant='body1' color='text.secondary' width={{xs: "80%", md: "95%"}}
                                    textAlign={'center'}>
                                    {t("landing.pricing.card.cancellation")} 
                                </Typography>
                                <Box width={"100%"} sx={{bgcolor: "background.default"}} mt={1} p={4}>
                                    <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
                                        <CheckCircle sx={{color: "success.main"}}/>
                                        <Typography variant='body1'>
                                            {t("landing.pricing.card.features.1starter")} 
                                        </Typography>
                                    </Box>
                                    <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
                                        <CheckCircle sx={{color: "success.main"}}/>
                                        <Typography variant='body1'>
                                            {t("landing.pricing.card.features.2starter")} 
                                        </Typography>
                                    </Box>
                                    <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
                                        <CheckCircle sx={{color: "success.main"}}/>
                                        <Typography variant='body1'>                               
                                            {t("landing.pricing.card.features.3")} 
                                        </Typography>
                                    </Box>
                                    <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
                                        <CheckCircle sx={{color: "success.main"}}/>
                                        <Typography variant='body1'>                               
                                            {t("landing.pricing.card.features.4")} 
                                        </Typography>
                                    </Box>
                                    <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
                                        <CheckCircle sx={{color: "success.main"}}/>
                                        <Typography variant='body1'>                               
                                            {t("landing.pricing.card.features.5")} 
                                        </Typography>
                                    </Box>
                                    <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
                                        <CheckCircle sx={{color: "success.main"}}/>
                                        <Typography variant='body1'>                               
                                            {t("landing.pricing.card.features.6")} 
                                        </Typography>
                                    </Box>
                                    <Button variant='contained' sx={{height: "50px", bgcolor: "primary.main",
                                        color: "#fff", width: "100%", fontSize: 18, fontWeight: 600,
                                        boxShadow: (theme) =>
                                        `0px 6px 20px ${theme.palette.primary.main}80`,
                                        mt: 2
                                    }} onClick={() => navigate("/payment")}>
                                        {t("landing.pricing.card.button")}
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid size={{xs: 12, sm: 6, md: 4}}>
                            <Card sx={{width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
                                boxShadow: (theme) =>
                                    `0px 6px 20px ${theme.palette.primary.main}60`,
                                position: "relative", transform: {xs: "translateY(0px)", md: "translateY(-20px)"}
                            }}>
                                <Box position={'absolute'} top={0} right={0} width={"100px"} height={"40px"}
                                sx={{bgcolor: "primary.main", borderRadius: "0 0 0 30%"}} display={'flex'} justifyContent={'center'}
                                alignItems={'center'}>
                                    <Typography variant='body2' fontSize={12} sx={{color: "#fff"}} fontWeight={700}>
                                        {t("landing.pricing.card.badge")}
                                    </Typography>
                                </Box>
                                <Typography variant='h5' fontWeight={700} textAlign={'center'} mt={5}>
                                    {t("landing.pricing.card.proPlan")}
                                </Typography>
                                <Box textAlign={'center'}>
                                    <Typography variant='h5' fontWeight={700} textAlign={'center'}>
                                        12$
                                        <Typography display={'inline-block'} variant='body1' color='text.secondary'>
                                            {t("landing.pricing.card.perMonth")}
                                        </Typography>
                                    </Typography>
                                    <Typography variant='h5' color='text.secondary' fontWeight={700}>
                                        or
                                    </Typography>
                                    <Typography variant='h3' fontWeight={700} textAlign={'center'}>
                                        120$ 
                                        <Typography display={'inline-block'} variant='body1' color='text.secondary'>
                                            {t("landing.pricing.card.perYear")}
                                        </Typography>
                                    </Typography>
                                </Box>
                                <Box display={'flex'} alignItems={'center'} gap={1}
                                sx={{bgcolor: "primary.light", px: 2, py: 1, borderRadius: 2}}>
                                    <Star fontSize='12' sx={{color: mode === "light" ? "primary.main" : "#fff"}}/>
                                    <Typography variant='body1' sx={{color: mode === "light" ? "primary.main" : "#fff"}}>
                                        {t("landing.pricing.card.perYearLabel")}
                                    </Typography>
                                </Box>
                                <Typography variant='body1' color='text.secondary' width={{xs: "80%", md: "95%"}}
                                    textAlign={'center'}>
                                    {t("landing.pricing.card.cancellation")}
                                </Typography>
                                <Box width={"100%"} sx={{bgcolor: "background.default"}} mt={1} p={4}>
                                    <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
                                        <CheckCircle sx={{color: "success.main"}}/>
                                        <Typography variant='body1'>
                                            {t("landing.pricing.card.features.1")}
                                        </Typography>
                                    </Box>
                                    <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
                                        <CheckCircle sx={{color: "success.main"}}/>
                                        <Typography variant='body1'>
                                            {t("landing.pricing.card.features.2")}
                                        </Typography>
                                    </Box>
                                    <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
                                        <CheckCircle sx={{color: "success.main"}}/>
                                        <Typography variant='body1'>                               
                                            {t("landing.pricing.card.features.3")}
                                        </Typography>
                                    </Box>
                                    <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
                                        <CheckCircle sx={{color: "success.main"}}/>
                                        <Typography variant='body1'>                               
                                            {t("landing.pricing.card.features.4")}
                                        </Typography>
                                    </Box>
                                    <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
                                        <CheckCircle sx={{color: "success.main"}}/>
                                        <Typography variant='body1'>                               
                                            {t("landing.pricing.card.features.5")}
                                        </Typography>
                                    </Box>
                                    <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
                                        <CheckCircle sx={{color: "success.main"}}/>
                                        <Typography variant='body1'>                               
                                            {t("landing.pricing.card.features.6")}
                                        </Typography>
                                    </Box>
                                    <Button variant='contained' sx={{height: "50px", bgcolor: "primary.main",
                                        color: "#fff", width: "100%", fontSize: 18, fontWeight: 600,
                                        boxShadow: (theme) =>
                                        `0px 6px 20px ${theme.palette.primary.main}80`,
                                        mt: 2
                                    }} onClick={() => navigate("/payment")}>
                                        {t("landing.pricing.card.button")}
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid size={{xs: 12, sm: 6, md: 4}}>
                            <Card sx={{width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
                                boxShadow: (theme) =>
                                    `0px 6px 20px ${theme.palette.primary.main}60`,
                                position: "relative"
                            }}>
                                <Typography variant='h5' fontWeight={700} textAlign={'center'} mt={5}>
                                    {t("landing.pricing.card.enterprisePlan")}
                                </Typography>
                                <Box textAlign={'center'}>
                                    <Typography variant='h5' fontWeight={700} textAlign={'center'}>
                                        24$
                                        <Typography display={'inline-block'} variant='body1' color='text.secondary'>
                                            {t("landing.pricing.card.perMonth")}
                                        </Typography>
                                    </Typography>
                                    <Typography variant='h5' color='text.secondary' fontWeight={700}>
                                        or
                                    </Typography>
                                    <Typography variant='h3' fontWeight={700} textAlign={'center'}>
                                        240$ 
                                        <Typography display={'inline-block'} variant='body1' color='text.secondary'>
                                            {t("landing.pricing.card.perYear")}
                                        </Typography>
                                    </Typography>
                                </Box>
                                <Box display={'flex'} alignItems={'center'} gap={1}
                                sx={{bgcolor: "primary.light", px: 2, py: 1, borderRadius: 2}}>
                                    <Star fontSize='12' sx={{color: mode === "light" ? "primary.main" : "#fff"}}/>
                                    <Typography variant='body1' sx={{color: mode === "light" ? "primary.main" : "#fff"}}>
                                        {t("landing.pricing.card.perYearLabel")} 
                                    </Typography>
                                </Box>
                                <Typography variant='body1' color='text.secondary' width={{xs: "80%", md: "95%"}}
                                    textAlign={'center'}>
                                    {t("landing.pricing.card.cancellation")} 
                                </Typography>
                                <Box width={"100%"} sx={{bgcolor: "background.default"}} mt={1} p={4}>
                                    <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
                                        <CheckCircle sx={{color: "success.main"}}/>
                                        <Typography variant='body1'>
                                            {t("landing.pricing.card.features.1enterprise")} 
                                        </Typography>
                                    </Box>
                                    <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
                                        <CheckCircle sx={{color: "success.main"}}/>
                                        <Typography variant='body1'>
                                            {t("landing.pricing.card.features.2enterprise")} 
                                        </Typography>
                                    </Box>
                                    <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
                                        <CheckCircle sx={{color: "success.main"}}/>
                                        <Typography variant='body1'>                               
                                            {t("landing.pricing.card.features.3")} 
                                        </Typography>
                                    </Box>
                                    <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
                                        <CheckCircle sx={{color: "success.main"}}/>
                                        <Typography variant='body1'>                               
                                            {t("landing.pricing.card.features.4")} 
                                        </Typography>
                                    </Box>
                                    <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
                                        <CheckCircle sx={{color: "success.main"}}/>
                                        <Typography variant='body1'>                               
                                            {t("landing.pricing.card.features.5")} 
                                        </Typography>
                                    </Box>
                                    <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
                                        <CheckCircle sx={{color: "success.main"}}/>
                                        <Typography variant='body1'>                               
                                            {t("landing.pricing.card.features.6")} 
                                        </Typography>
                                    </Box>
                                    <Button variant='contained' sx={{height: "50px", bgcolor: "primary.main",
                                        color: "#fff", width: "100%", fontSize: 18, fontWeight: 600,
                                        boxShadow: (theme) =>
                                        `0px 6px 20px ${theme.palette.primary.main}80`,
                                        mt: 2
                                    }} onClick={() => navigate("/payment")}>
                                        {t("landing.pricing.card.button")}
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} mt={6}>
                        <Grid size={{xs: 12, md: 4}} sx={{ display: "flex" }}>
                            <Card sx={{width: "100%", display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, py: 2, px: 4, flexGrow: 1}}>
                                <VerifiedUser sx={{color: "primary.main"}}/>
                                <Box>
                                    <Typography variant='body1' color='text.primary' fontWeight={700}>
                                        {t("profile.subscription.securePayment")}
                                    </Typography>
                                    <Typography variant='body1' color='text.secondary' fontSize={12}>
                                        {t("profile.subscription.encrypted")}
                                    </Typography>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid size={{xs: 12, md: 4}} sx={{ display: "flex" }}>
                            <Card sx={{width: "100%", display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, py: 2, px: 4, flexGrow: 1}}>
                                <SupportAgent sx={{color: "primary.main"}}/>
                                <Box>
                                    <Typography variant='body1' color='text.primary' fontWeight={700}>
                                        {t("profile.subscription.support")}
                                    </Typography>
                                    <Typography variant='body1' color='text.secondary' fontSize={12}>
                                        {t("profile.subscription.help")}
                                    </Typography>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid size={{xs: 12, md: 4}} sx={{ display: "flex" }}>
                            <Card sx={{width: "100%", display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, py: 2, px: 4, flexGrow: 1}}>
                                <Restore sx={{color: "primary.main"}}/>
                                <Box>
                                    <Typography variant='body1' color='text.primary' fontWeight={700}>
                                        {t("profile.subscription.commitment")}
                                    </Typography>
                                    <Typography variant='body1' color='text.secondary' fontSize={12}>
                                        {t("profile.subscription.cancelAnytime")}
                                    </Typography>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                    <Typography variant='body1' color='primary.main' fontWeight={700} mt={4} textAlign={'center'}>
                        {t("landing.pricing.noCard")}
                    </Typography>
                    <Button variant='outlined' color='primary' sx={{mt: 2, mx: "auto", display: "block",
                        fontSize: 18, fontWeight: 600, height: "50px", width: "200px",
                    }} onClick={() => navigate("contact-us")}>
                        {t("landing.pricing.contactUs")}
                    </Button>
                </Container>
            </Box>
    </Box>
    </>
  )
}

export default Subscription