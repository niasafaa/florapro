import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from 'semantic-ui-react';
import background from '../img/img4cover.jpg';

const getWidth = () => {
  const isSSR = typeof window === 'undefined';

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

/* eslint-disable react/no-multi-comp */

const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="FloraPRO"
      inverted
      style={{
        fontSize: mobile ? '2em' : '7em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '2em',
        marginLeft: '-2em'
      }}
    />
    <Header
      as="h2"
      content="Know your flora."
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
        marginLeft: '-8em'
      }}
    />
    <Button primary size="huge" style={{ marginLeft: '-11em' }}>
      Get Started
      <Icon name="right arrow" />
    </Button>
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
};

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            style={{
              minHeight: 700,
              padding: '1em 0em',
              backgroundImage: `url(${background})`,
              backgroundSize: '120%'
            }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item as="a" active>
                  Home
                </Menu.Item>
                <Menu.Item as="a" href="/landingpage#">
                  Science
                </Menu.Item>
                <Menu.Item as="a">About</Menu.Item>
                <Menu.Item position="right">
                  <Button as="a" href="/login" inverted={!fixed}>
                    Log in
                  </Button>
                  <Button
                    as="a"
                    href="/register"
                    inverted={!fixed}
                    primary={fixed}
                    style={{ marginLeft: '0.5em' }}
                  >
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as="a" active>
            Home
          </Menu.Item>
          <Menu.Item as="a">Work</Menu.Item>
          <Menu.Item as="a">Company</Menu.Item>
          <Menu.Item as="a">Careers</Menu.Item>
          <Menu.Item as="a">Log in</Menu.Item>
          <Menu.Item as="a">Sign Up</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  <Button as="a" inverted>
                    Log in
                  </Button>
                  <Button as="a" inverted style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const landingPage = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              We Give People Access to Their Personalized Health
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Bacteria plays an essential role in the health of your skin,
              digestive system and even mind. FloraPRO allows users to test the
              contents of their gut and skin bacteria and receive personalized
              information about both their health.
            </p>
            <Header as="h3" style={{ fontSize: '2em' }}>
              What Will You Do With Your Data
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              A 100% of our customers report making a lifestyle change based on
              their test results.
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image
              bordered
              rounded
              size="large"
              src={require('../img/test.jpg')}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Button size="huge">Learn More</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              "My FloraPRO test changed my life. I'm healthier than ever."
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <Image
                bordered
                centered
                size="small"
                src={require('../img/lil.png')}
              />
              <b>Lilia</b> Customer
            </p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              "This is an excellent company. So glad I found FloraPRO!"
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <Image
                bordered
                size="small"
                centered
                src={require('../img/yas.png')}
              />
              <b>Yasmine</b> Customer
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container id="ourScience" text>
        <Header as="h1" style={{ fontSize: '3em' }}>
          Our Science
        </Header>
        <Header as="h3" style={{ fontSize: '2em' }}>
          Our Science Is Based On Demonstrated Results
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          My project data comes from the American Gut Project which is stored
          with European Nucleotide Archive (ENA). The data consists of 25000
          fecal, oral and skin samples from individuals across the US. Along
          with this data is are participant questionnaires which provide data on
          a wide ranging set of patient health and lifestyle info.
        </p>
        <Button as="a" size="large">
          Read More
        </Button>
        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href="#">Case Studies</a>
        </Divider>
        <Header as="h3" style={{ fontSize: '2em' }}>
          Sequencing Reads and ENA Data
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          The ENA (European Nucleotide Archive) stores the raw sequencing data
          for the submitted study in a FASTQ file. For the Human Gut Project,
          submitted fecal, oral and skin undergo a DNA extraction process that
          includes the homogenization the sample, cell lysis, and DNA
          purification. The purified DNA sample is then prepared for the
          sequencing run. A PCR process is used to amplify the gene region of
          interest, in this case the 16S RNA gene region which is specific to
          bacteria and allows for taxonomic profiling of phyla and species.
        </p>
        <Button as="a" size="large">
          Read More
        </Button>
      </Container>
    </Segment>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as="h1" style={{ fontSize: '3em' }}>
          About
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          The FloraPro application will allow user to create a user profile.
          Order a test and receive their (mocked) gut flora data. The user will
          then be able to see their results via an explorer page. Additional
          features may include, probiotic product reccommendations and more
          extensive product page.
        </p>
        <Button as="a" size="large">
          Read More
        </Button>
      </Container>
    </Segment>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a">Sitemap</List.Item>
                <List.Item as="a">Contact Us</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item as="a">Kit Pre-Order</List.Item>
                <List.Item as="a">DNA FAQ</List.Item>
                <List.Item as="a">How To Access</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4" inverted>
                Order Now
              </Header>
              <p>Be a part of the gut health movement.</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);
export default landingPage;
