import React from "react";
import { Container } from "react-bootstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/pt-br";
import './CSS/Estilo.css';

const localizer = momentLocalizer(moment);

const messages = {
  today: "Hoje",
  previous: "Anterior",
  next: "Próximo",
};

const CalendarioEvento = ({ eventos }) => {
  const eventList = eventos.map((evento) => ({
    title: evento.nomeEvento,
    start: moment(`${evento.DataEvento} ${evento.HoraEvento}`, "YYYY-MM-DD HH:mm").toDate(),
    end: moment(`${evento.DataEvento} ${evento.HoraEvento}`, "YYYY-MM-DD HH:mm").toDate(), // Define a data de término do evento como a mesma data/hora do início
  }));

  // Componente personalizado para exibir o título e a hora do evento
  const EventComponent = ({ event }) => (
    <div className="event-container">
      <strong>{event.title}</strong>
      <br />
      <span className="event-time d-flex justify-content-start">
        Hora: {moment(event.start).format("HH:mm")}
      </span>
    </div>
  );


  return (
    <Container>
      <div className="calendario-container" style={{ marginBottom: "20%" }}>
        <Calendar
          localizer={localizer}
          events={eventList}
          views={{ month: true }} // Define as visualizações disponíveis, incluindo a do mês
          defaultView="month" // Define a visualização inicial do calendário como "month" (modo de visualização do mês)
          toolbar={true} // Remove a barra de ferramentas do calendário
          messages={messages} // Define as mensagens para os botões de navegação
          components={{
            event: EventComponent, // Importe e utilize o componente personalizado para exibir o título e a hora do evento
          }}

          dayHeaderFormat={(date, culture, localizer) =>
            localizer.format(date, "ddd", culture).toUpperCase()
          }
          monthHeaderFormat={(date, culture, localizer) =>
            localizer.format(date, "MMMM YYYY", culture).toUpperCase()
          }
          style={{ fontFamily: "Arial, sans-serif" }}
          showMultiDayTimes // Adiciona o botão "ver mais" quando há vários eventos no mesmo dia
          max={5} // Define o número máximo de eventos que serão exibidos em uma célula de dia


        />
      </div>
    </Container>
  );
};

export default CalendarioEvento;

