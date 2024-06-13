import {NoteModelType} from '../../databases/models/noteModel';

const ONE_DAY_IN_MILLISECONDS = 86400000;

const MULTIPLICATOR_FACTOR = {
  '1': 1,
  '2': 7,
  '3': 30,
  '4': 90,
};

const noteNeedToBeRevised = (note: NoteModelType) => {
  const {levelRevision = 0, lastRevision} = note;
  let needToBeRevised = false;
  const today = new Date();

  if (!isNaN(levelRevision) && levelRevision < 5 && levelRevision > 0) {
    needToBeRevised =
      today.getTime() - new Date(lastRevision).getTime() >
      ONE_DAY_IN_MILLISECONDS *
        MULTIPLICATOR_FACTOR[
          levelRevision.toString() as keyof typeof MULTIPLICATOR_FACTOR
        ];
  }

  return needToBeRevised;
};

export default noteNeedToBeRevised;
