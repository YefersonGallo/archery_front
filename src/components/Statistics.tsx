import { Accordion, Label, Message } from 'semantic-ui-react';
import { useEffect, useState } from 'react';

type Props = {
  page: number
}

const Statistics = ({ page }: Props) => {

  const [info, setInfo] = useState<{ male: number, female: number, team_1: string, total_points_1: number, team_2: string, total_points_2: number }>({
    female: 0,
    male: 0,
    team_1: '',
    team_2: '',
    total_points_1: 0,
    total_points_2: 0,
  });

  useEffect(() => {
    async function fetchMyAPI() {
      const responseIn = await fetch('https://archery-back.herokuapp.com/statistics');
      const response = await responseIn.json();
      setInfo(response);
      console.log(response);
    }

    if (page === 2 && info.team_1 === '') {
      fetchMyAPI();
    }
  }, [info, page]);

  const panels = [{
    key: `panel-${1}`,
    title: {
      content: <Label color='blue' content={'Victorias Masculinas en total'} icon={'mars'} />,
    },
    content: {
      content: (
        <Message
          info
          header={'Victorias'}
          content={`Durante los 1000 juegos el género masculino tuvo ${info.male} victorias`}
        />
      ),
    },
  }, {
    key: `panel-${2}`,
    title: {
      content: <Label color='blue' content={'Victorias Femeninas en total'} icon={'venus'} />,
    },
    content: {
      content: (
        <Message
          info
          header={'Victorias'}
          content={`Durante los 1000 juegos el género femenino tuvo ${info.female} victorias`}
        />
      ),
    },
  }, {
    key: `panel-${3}`,
    title: {
      content: <Label color='blue' content={info.team_1} icon={'users'} />,
    },
    content: {
      content: (
        <Message
          info
          header={'Victorias'}
          content={`Durante los 1000 juegos el equipo ${info.team_1} obtuvo ${info.total_points_1} puntos`}
        />
      ),
    },
  }, {
    key: `panel-${4}`,
    title: {
      content: <Label color='blue' content={info.team_2} icon={'users'} />,
    },
    content: {
      content: (
        <Message
          info
          header={'Victorias'}
          content={`Durante los 1000 juegos el equipo ${info.team_2} obtuvo ${info.total_points_2} puntos`}
        />
      ),
    },
  }];

  return (
    <Accordion panels={panels} styled />
  );
};

export default Statistics;