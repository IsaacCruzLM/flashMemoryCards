import WmdbUtils from '../../databases/utils';

const MULTIPLICATOR_FACTOR = {
  '1': 1,
  '2': 7,
  '3': 30,
  '4': 90,
};

const noteRevisionUpdate = (
  id: string,
  levelRevision: number,
  creationDate: string,
  needRevision: string,
) => {
  const today = new Date();
  const createdAt = new Date(creationDate);
  const newLevelRevision = levelRevision + 1;

  if (newLevelRevision <= 4) {
    WmdbUtils.updateItemInWMDB(
      'notes',
      {
        lastRevision: today,
        ...(needRevision
          ? {
              levelRevision: newLevelRevision,
              nextRevision: createdAt.setDate(
                createdAt.getDate() +
                  MULTIPLICATOR_FACTOR[
                    newLevelRevision.toString() as keyof typeof MULTIPLICATOR_FACTOR
                  ],
              ),
            }
          : {}),
      },
      id,
    );
  }
};

export default noteRevisionUpdate;
