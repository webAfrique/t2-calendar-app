import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

function SocialIcons() {
  return (
    <Grid item container spacing={3} justifyContent={"center"}>
      <Grid item>
        <Link href="#" color="inherit">
          <FacebookIcon />
        </Link>
      </Grid>
      <Grid item>
        <Link href="#" color="inherit">
          <TwitterIcon />
        </Link>
      </Grid>
      <Grid item>
        <Link href="#" color="inherit">
          <InstagramIcon />
        </Link>
      </Grid>
    </Grid>
  );
}

function Footer() {
  return (
    <ThemeProvider theme={createTheme()}>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          backgroundColor: "#fff",
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Container>
          <Typography
            variant="body1"
            sx={{
              textAlignLast: "auto",
              fontWeight: "400",
              fontSize: "14px",
              lineHeight: "25px",
              color: "#333333",
            }}>
            Copyright &copy; {new Date().getFullYear()}
          </Typography>
        </Container>
        <Container>
          <SocialIcons />
        </Container>
        <Container>
          <Typography
            variant="body1"
            sx={{
              textAlignLast: "center",
              fontWeight: "400",
              fontSize: "14px",
              lineHeight: "25px",
              color: "#333333",
            }}>
            Contact us: +358 12 345 6789
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Footer;
