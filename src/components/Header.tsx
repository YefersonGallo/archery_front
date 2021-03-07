import React from 'react';
import { Grommet, Header, Anchor, Box, ResponsiveContext, Menu } from 'grommet';
import { Target as GrommetIcon, Menu as MenuIcon } from 'grommet-icons';
import { hpe } from 'grommet-theme-hpe';

const HeaderPage = () => {
  return (
    <Grommet theme={hpe}>
      <Header background='light-4' pad='medium' height='xsmall'>
        <Anchor
          href="/"
          size={'xxlarge'}
          icon={<GrommetIcon size={"large"} color="brand" />}
          label="Juego de Arquería"
        />
        <ResponsiveContext.Consumer>
          {size =>
            size === 'small' ? (
              <Box justify='end'>
                <Menu
                  a11yTitle='Navigation Menu'
                  dropProps={{ align: { top: 'bottom', right: 'right' } }}
                  icon={<MenuIcon color='brand' />}
                  items={[
                    {
                      label: <Box pad='small'>Código</Box>,
                      href: '/code',
                    },
                    {
                      label: <Box pad='small'>Acerca de</Box>,
                      href: '/about',
                    },
                  ]}
                />
              </Box>
            ) : (
              <Box justify='end' direction='row' gap='medium'>
                <Anchor href='/code' label='Código Fuente' />
                <Anchor href='/about' label='Acerca de' />
              </Box>
            )
          }
        </ResponsiveContext.Consumer>
      </Header>
    </Grommet>
  );
};

export default HeaderPage;