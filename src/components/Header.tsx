import React from 'react';
import { Grommet, Header, Anchor, Heading, Box, ResponsiveContext, Menu } from 'grommet';
import { Target as GrommetIcon, Menu as MenuIcon } from 'grommet-icons';
import { grommet } from 'grommet/themes';

const HeaderPage = () => {
  return (
    <Grommet theme={grommet}>
      <Header background='light-4' pad='medium' height='xsmall'>
        <Heading level="2"><GrommetIcon size='large' color='brand' />  Juego de Arquería</Heading>
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
                    },
                    {
                      label: <Box pad='small'>Acerca de</Box>,
                    },
                  ]}
                />
              </Box>
            ) : (
              <Box justify='end' direction='row' gap='medium'>
                <Anchor href="#" label="Código Fuente" />
                <Anchor href="#" label="Acerca de" />
              </Box>
            )
          }
        </ResponsiveContext.Consumer>
      </Header>
    </Grommet>
  );
};

export default HeaderPage;