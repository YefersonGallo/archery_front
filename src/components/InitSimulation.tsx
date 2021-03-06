import { Box, Grommet, Heading, Paragraph } from 'grommet';
import { hpe as grommet } from 'grommet-theme-hpe';
import { Icon, SemanticCOLORS, Step } from 'semantic-ui-react';
import CreateTeams from './CreateTeams';
import StartSimulation from './StartSimulation';
import { useEffect, useState } from 'react';
import Statistics from './Statistics';

const InitSimulation = () => {
  const [state, setState] = useState(0);
  const [ping, setPing] = useState(0);
  const [teams, setTeams] = useState<Array<{ name?: string, color: SemanticCOLORS, players?: Array<{ 'endurance': number, 'gender': string, 'id': number }> }>>([]);

  useEffect(() => {
    if (ping === 0) {
      fetch('https://archery-back.herokuapp.com/ping').then(r => r);
      setPing(1);
    }
  }, [ping]);

  return (
    <div>
      <Grommet theme={grommet}>
        <Box gridArea='header' justify='center' align='center'>
          <Heading level='1' size='medium'>Simulación de un Juego de Arquería usando el método de Montecarlo</Heading>
          <Paragraph>El objetivo de esta simulación, es enfrentar a dos equipos durante 1000 juegos, teniendo en cuenta
            la evolución de los personajes en términos de resistencia y experiencia</Paragraph>
          <Paragraph>Para inicar la simulación se deben seguir los pasos de abajo.</Paragraph>
          <Step.Group attached='top'>
            <Step active={state === 0} completed={state > 0}>
              <Icon name='group' />
              <Step.Content>
                <Step.Title>Equipos</Step.Title>
                <Step.Description>Crear los dos equipos mixtos que se enfrentarán</Step.Description>
              </Step.Content>
            </Step>

            <Step active={state === 1} completed={state > 1} disabled={state < 1}>
              <Icon name='flag checkered' />
              <Step.Content>
                <Step.Title>Juego</Step.Title>
                <Step.Description>Inicio de los 1000 juegos</Step.Description>
              </Step.Content>
            </Step>

            <Step active={state === 2} completed={state > 2} disabled={state < 2}>
              <Icon name='chart bar outline' />
              <Step.Content>
                <Step.Title>Estadísticas</Step.Title>
                <Step.Description>Resultados luego de los 1000 juegos</Step.Description>
              </Step.Content>
            </Step>
          </Step.Group>
          <div hidden={state !== 0}>
            <CreateTeams
              start={(page: number, teams: Array<{ name: string, color: SemanticCOLORS, players: Array<{ 'endurance': number, 'gender': string, 'id': number }> }>) => {
                setState(page);
                setTeams(teams);
              }} />
          </div>
          <div hidden={state !== 1}>
            <StartSimulation team1={teams[0]} team2={teams[1]} next={(page: number, stats: any) => {
              setState(page);
            }} />
          </div>
          <div hidden={state !== 2}>
            <Statistics page={state} />
          </div>
        </Box>
      </Grommet>
    </div>
  );
};
export default InitSimulation;