const getDayTwoDaysFromDay = (day: string) => {
  switch (day) {
    case 'monday': return 'wednesday';
    case 'tuesday': return 'thursday';
    case 'wednesday': return 'friday';
    case 'thursday': return 'saturday';
    case 'friday': return 'sunday';
    case 'saturday': return 'monday';
    case 'sunday': return 'tuesday';
  }
};

const DayUtil = {
  getDayTwoDaysFromDay,
};

export default DayUtil;
