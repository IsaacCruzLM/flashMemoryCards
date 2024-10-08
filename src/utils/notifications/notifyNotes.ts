import scheduleNotification from './scheduleNotification';

const DAY_IN_MILISECONDS = 86400000;

interface NoteData {
  name: string;
  id: string;
}

const scheduleNotifyNotes = (noteData: NoteData): void => {
  const daysSchedule = [
    {
      day: 1,
      message:
        'Já se passou um dia! É hora de revisar a anotação que você criou. Mantenha o conhecimento fresco.',
    },
    {
      day: 7,
      message:
        'Faz uma semana desde sua anotação. Revise-a agora para reforçar o aprendizado.',
    },
    {
      day: 30,
      message:
        'Um mês já passou! Revisite sua anotação para consolidar o que você aprendeu.',
    },
    {
      day: 180,
      message:
        'Meio ano se foi! Revisite a anotação que você fez para ver o quanto você evoluiu desde então.',
    },
  ];

  daysSchedule.map(schedule => {
    scheduleNotification(
      'note-notification-id',
      `Revise a anotação "${noteData.name}"`,
      schedule.message,
      new Date(Date.now() + schedule.day * DAY_IN_MILISECONDS),
      {title: noteData.name, id: noteData.id},
    );
  });
};

export default scheduleNotifyNotes;
