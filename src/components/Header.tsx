import React from 'react';
import { Grommet, Header, Anchor, Box } from 'grommet';
import { Target as GrommetIcon } from 'grommet-icons';
import { hpe } from 'grommet-theme-hpe';
import { Link } from 'react-router-dom';

const HeaderPage = () => {
  return (
    <Grommet theme={hpe}>
      <Header background='light-4' pad='medium' height='xsmall'>
        <Anchor
          href='/'
          size={'xxlarge'}
          icon={<GrommetIcon size={'large'} color='brand' />}
          label='Juego de Arquería'
        />
        <Box justify='end' direction='row' gap='medium'>
          <Link to='/code'>
            <Anchor href='#' label='Código Fuente' />
          </Link>
          <Link to='/about'>
            <Anchor href='#' label='Acerca de' />
          </Link>
        </Box>
      </Header>
    </Grommet>
  );
};

export default HeaderPage;