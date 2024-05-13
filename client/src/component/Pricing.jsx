import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const tiers = [
  {
    title: "Basic",
    price: "0",
    description: [
      "25 days of Advent Calendar",
      "Limited customization",
      "Access to basic themes",
      "Email support",
    ],
    buttonText: "Free",
    buttonVariant: "outlined",
  },
  {
    title: "Premium",
    subheader: "Recommended",
    price: "9.99",
    description: [
      "Unlimited days",
      "Advanced customization",
      "Access to premium themes",
      "Priority email support",
      "Exclusive features",
    ],
    buttonText: "Premium",
    buttonVariant: "contained",
  },
  {
    title: "Enterprise",
    price: "19.99",
    description: [
      "White-label solution",
      "Custom branding options",
      "Dedicated account manager",
      "Phone & email support",
    ],
    buttonText: "Contact us",
    buttonVariant: "outlined",
  },
];

export default function Pricing() {
  return (
    <Box
      sx={{
        margin: 0,
        minHeight: "100vh",
        backgroundImage: "url(/hero_image.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: { xs: "40px", md: "0 50px" },
        textAlign: "center",
      }}
    >
      <Container
        id="pricing"
        sx={{ py: { xs: 8, sm: 16 }, padding: { xs: "40px", md: "0 50px" } }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "70%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            sx={{
              fontSize: { xs: "36px", md: "60px" },
              fontWeight: "bold",
              color: "#476C92",
              textAlign: "center",
              mb: 2,
            }}
          >
            Pricing
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              fontSize: { xs: "18px", md: "24px" },
              fontWeight: "bold",
              color: "#00A8CD",
              textAlign: "center",
              mb: 2,
            }}
          >
            Choose the perfect plan for your Advent Calendar needs and delight
            your users this holiday season!
          </Typography>
        </Box>
        <Box
          sx={{
            width: { sm: "100%", md: "70%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              flexFlow: "nowrap",
              gap: 1,
            }}
            alignItems="center"
            justifyContent="center"
          >
            {tiers.map((tier) => (
              <Grid
                item
                key={tier.title}
                xs={12}
                sm={tier.title === "Enterprise" ? 12 : 6}
                md={4}
              >
                <Card
                  sx={{
                    py: 2,
                    display: "flex",
                    flexDirection: "column",

                    border: tier.title === "Premium" ? "1px solid" : undefined,
                    borderColor:
                      tier.title === "Premium" ? "primary.main" : undefined,
                    background:
                      tier.title === "Premium" ? "#E0F7FA" : undefined,
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        mb: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: tier.title === "Premium" ? "#00A8CD" : "#00A8CD",
                      }}
                    >
                      <Typography component="h3" variant="h6">
                        {tier.title}
                      </Typography>
                      {tier.title === "Premium" && (
                        <Chip
                          icon={<AutoAwesomeIcon />}
                          label={tier.subheader}
                          size="small"
                          sx={{
                            background: (theme) =>
                              theme.palette.mode === "light" ? "" : "none",
                            backgroundColor: "primary.contrastText",
                            "& .MuiChip-label": {
                              color: "#00A8CD",
                            },
                            "& .MuiChip-icon": {
                              color: "#00A8CD",
                            },
                          }}
                        />
                      )}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "baseline",
                        color: tier.title === "Premium" ? "#476C92" : "#476C92",
                      }}
                    >
                      <Typography component="h4" variant="h4">
                        €{tier.price}
                      </Typography>
                      <Typography component="h4" variant="body1">
                        &nbsp; per month
                      </Typography>
                    </Box>
                    <Divider
                      sx={{
                        my: 2,
                        opacity: 0.4,
                        borderColor: "grey.500",
                      }}
                    />
                    {tier.description.map((line) => (
                      <Box
                        key={line}
                        sx={{
                          py: 1,
                          display: "flex",
                          gap: 0.5,
                          alignItems: "center",
                        }}
                      >
                        <CheckCircleRoundedIcon
                          sx={{
                            width: 15,
                            color:
                              tier.title === "Premium" ? "#476C92" : "#476C92",
                          }}
                        />
                        <Typography
                          component="text"
                          variant="subtitle2"
                          sx={{
                            color:
                              tier.title === "Premium" ? "#476C92" : undefined,
                          }}
                        >
                          {line}
                        </Typography>
                      </Box>
                    ))}
                  </CardContent>
                  <CardActions
                    sx={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Button
                      variant={tier.buttonVariant}
                      sx={{
                        width: "150px",
                        height: "45px",
                        backgroundColor: "#476C92",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "30px",
                        textTransform: "capitalize",
                        fontSize: "1rem",
                        "&:hover": {
                          backgroundColor: "white",
                          color: "#476C92",
                          borderColor: "#476C92",
                          boxShadow: "none",
                          border: "1px solid",
                        },
                      }}
                    >
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
