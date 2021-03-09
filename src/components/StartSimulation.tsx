import { Button, Card, Feed, Segment, SemanticCOLORS } from 'semantic-ui-react';
import React, { useState } from 'react';

type Props = {
  team1: { name?: string, color: SemanticCOLORS, players?: Array<{ 'endurance': number, 'gender': string, 'id': number }> }
  team2: { name?: string, color: SemanticCOLORS, players?: Array<{ 'endurance': number, 'gender': string, 'id': number }> }
}

const StartSimulation = ({ team1, team2 }: Props) => {
  const [panels, setPanels] = useState<Array<any>>([]);
  const [buttonName, setButtonName] = useState('Iniciar Juegos');
  const [button, setButton] = useState(false);

  const initSimulation = async () => {
    setPanels([]);
    setButton(true);
    for (let i = 1; i <= 5; i++) {
      setButtonName(`Juego ${i}`);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team1, team2 }),
      };
      //const responseP = await fetch('http://localhost:5000/play_round', requestOptions);
      const responseP = await fetch('https://archery-back.herokuapp.com/play_round', requestOptions);
      const res = await responseP.json();
      team1 = res.team_1;
      team2 = res.team_2;
      add_panel(res);
      setButtonName('Iniciar Juegos');
    }
    setButton(false);
  };

  const add_panel = (panel: any) => {
    setPanels(prevState => prevState.concat(panel));
  };

  return (
    <Segment size={'massive'}>
      <Card.Group centered>
        <Button className='button-init' disabled={button} size={'large'}
                onClick={() => initSimulation()}>{buttonName}</Button>
      </Card.Group>
      <Card.Group stackable>
        {
          panels.map((panel, i) => {
            return (
              <Card key={i} color={panel['team_win'].color}>
                <Card.Content>
                  <Card.Header>Equipo Ganador: {panel['team_win'].name}</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Feed>
                    <Feed.Event>
                      <Feed.Label icon={panel['winner'].gender === 'male' ? 'mars stroke' : 'venus'} />
                      <Feed.Content>
                        <Feed.Summary>
                          Ganador individual: Jugador {panel['winner'].id} del equipo {panel['winner'].team}
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                    <Feed.Event>
                      <Feed.Label icon={panel['lucky'].gender === 'male' ? 'mars stroke' : 'venus'} />
                      <Feed.Content>
                        <Feed.Summary>
                          Jugador con más suerte: Jugador {panel['lucky'].id} del equipo {panel['lucky'].team}
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