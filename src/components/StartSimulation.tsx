import { Button, Card, Segment } from 'semantic-ui-react';
import React, { useState } from 'react';

type Props = {
  team1: { name?: string, players?: Array<{ 'endurance': number, 'gender': string, 'id': number }> }
  team2: { name?: string, players?: Array<{ 'endurance': number, 'gender': string, 'id': number }> }
}

const StartSimulation = ({ team1, team2 }: Props) => {
  const [panels, setPanels] = useState<Array<any>>([]);
  const [buttonName, setButtonName] = useState('Iniciar Juegos');
  const [button, setButton] = useState(false);

  const initSimulation = async () => {
    restart_panels();
    setPanels([]);
    setButton(true);
    for (let i = 1; i <= 1000; i++) {
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
      console.log(res);
      console.log(buttonName);
      add_panel(i);
    }
    setButton(false);
  };

  const add_panel = (panel: number) => {
    panels.push(panel);
    let aux = panels.slice(0, panels.length - 1);
    setPanels(aux.concat(panel));
  };

  const restart_panels = () => {
    setPanels([]);
    setButtonName('Iniciar Juegos');
    setButton(false);
  };

  return (
    <Segment size={'huge'}>
      <Card.Group centered>
        <Button className='button-init' disabled={button} size={'large'}
                onClick={() => initSimulation()}>{buttonName}</Button>
        <Button className='button-init' size={'large'} onClick={() => {
          restart_panels();
        }}>Borrar Juegos</Button>
      </Card.Group>
      <Card.Group itemsPerRow={6}>
        {
          panels.map((panel) => {
            return (<Card key={panel}>{panel}</Card>);
          })
        }
      </Card.Group>
    </Segment>
  );
};
export default StartSimulation;