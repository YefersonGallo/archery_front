import { Button, Card, Feed, Segment, SemanticCOLORS } from 'semantic-ui-react';
import React, { useState } from 'react';

type Props = {
  team1: { name?: string, color: SemanticCOLORS, players?: Array<{ 'endurance': number, 'gender': string, 'id': number }> }
  team2: { name?: string, color: SemanticCOLORS, players?: Array<{ 'endurance': number, 'gender': string, 'id': number }> }
  next: (page: number, stats: any) => void
}

const StartSimulation = ({ team1, team2, next }: Props) => {
  const [panels, setPanels] = useState<Array<any>>([]);
  const [statistics, setStatistics] = useState();
  const [buttonName, setButtonName] = useState('Iniciar Juegos');
  const [button, setButton] = useState(false);
  const [view, setView] = useState(true);

  const initSimulation = async () => {
    setPanels([]);
    setButton(true);
    setView(true);
    for (let i = 1; i <= 3; i++) {
      setButtonName(`Juego ${i}`);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team1, team2, i }),
      };
      let responseP = await fetch('https://archery-back.herokuapp.com/play_game', requestOptions);
      while (!responseP.ok){
        responseP = await fetch('https://archery-back.herokuapp.com/play_game', requestOptions);
      }
      const res = await responseP.json();
      team1 = res.team_1;
      team2 = res.team_2;
      add_panel(res);
      setButtonName('Iniciar Juegos');
    }
    setButton(false);
    setView(false);
  };

  const getStats = async () => {
    const responseP = await fetch('https://archery-back.herokuapp.com/statistics');
    const res = await responseP.json();
    setStatistics(res);
  };

  const add_panel = (panel: any) => {
    setPanels(prevState => prevState.concat(panel));
  };

  const getIcon = (panel: any) => {
    if (panel['lucky'].id === 0) {
      return 'neuter';
    }
    return panel['lucky'].gender === 'male' ? 'mars' : 'venus';
  };

  const getIconGender = (panel: any) => {
    if (panel['female'] === panel['male']) {
      return 'neuter';
    }
    if (panel['female'] > panel['male']) {
      return 'venus';
    }
    if (panel['female'] < panel['male']) {
      return 'mars';
    }
  };

  const getMessage = (panel: any) => {
    if (panel['female'] === panel['male']) {
      return 'Hay un empate en las victotias por género';
    }
    if (panel['female'] > panel['male']) {
      return `El género que más victorias tiene es el femenino con ${panel['female']} victorias`;
    }
    if (panel['female'] < panel['male']) {
      return `El género que más victorias tiene es el masculino con ${panel['male']} victorias`;
    }
  };

  return (
    <Segment size={'massive'}>
      <Card.Group centered>
        <Button className='button-init' color={'blue'} disabled={button} size={'large'}
                onClick={() => initSimulation()}>{buttonName}</Button>
        <div hidden={view}>
          <Button className='button-init' color={'blue'} disabled={button} size={'large'}
                  onClick={async () => {
                    await getStats();
                    next(2, statistics);
                  }}>Ver Estadísticas</Button>
        </div>
      </Card.Group>
      <Card.Group stackable centered>
        {
          panels.map((panel, i) => {
            return (
              <Card key={i} color={panel['team_win'].color}>
                <Card.Content>
                  <Card.Header>Equipo Ganador: {panel['team_win'].name}</Card.Header>
                  <Card.Header>Puntaje: {panel['team_win'].points}</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Feed>
                    <Feed.Event>
                      <Feed.Label icon={panel['winner'].gender === 'male' ? 'mars' : 'venus'} />
                      <Feed.Content>
                        <Feed.Summary>
                          Ganador individual: Jugador {panel['winner'].id} del equipo {panel['winner'].team}
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                    <Feed.Event>
                      <Feed.Label icon={getIcon(panel)} />
                      <Feed.Content>
                        <Feed.Summary>
                          {panel['lucky'].id === 0 ? 'Hay dos jugadores con la misma suerte' : `Jugador con más suerte: Jugador ${panel['lucky'].id} del equipo ${panel['lucky'].team}`}
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                    <Feed.Event>
                      <Feed.Label icon={getIconGender(panel)} />
                      <Feed.Content>
                        <Feed.Summary>
                          {getMessage(panel)}
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                </Card.Content>
              </Card>);
          })
        }
      </Card.Group>
    </Segment>
  );
};
export default StartSimulation;