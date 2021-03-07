import { Box, Grommet, Heading, Paragraph } from 'grommet';
import { hpe as grommet } from 'grommet-theme-hpe';
import { Icon, Step } from 'semantic-ui-react';

const InitSimulation = () => {
  return (
    <div>
      <Grommet theme={grommet}>
        <Box gridArea='header' justify='center' align='center'>
          <Heading level='1' size='medium'>Simulación de un Juego de Arquería usando el método de Montecarlo</Heading>
          <Paragraph>El objetivo de esta simulación, es enfrentar a dos equipos durante 1000 juegos, teniendo en cuenta
            la evolución de los personajes en términos de resistencia y experiencia</Paragraph>
          <Paragraph>Para inicar la simualción se deben seguir los pasos de abajo.</Paragraph>
          <Step.Group attached='top'>
            <Step active>
              <Icon name='group' />
              <Step.Content>
                <Step.Title>Equipos</Step.Title>
                <Step.Description>Crear los dos equipos mixtos que se enfrentarán</Step.Description>
              </Step.Content>
            </Step>

            <Step disabled>
              <Icon name='payment' />
              <Step.Content>
                <Step.Title>Juego</Step.Title>
                <Step.Description>Inicio de los 1000 juegos</Step.Description>
              </Step.Content>
            </Step>

            <Step disabled>
              <Icon name='info' />
              <Step.Content>
                <Step.Title>Estadísticas</Step.Title>
                <Step.Description>Resultados luego de los 1000 juegos</Step.Description>
              </Step.Content>
            </Step>
          </Step.Group>
        </Box>
      </Grommet>
    </div>
  );
};
export default InitSimulation;