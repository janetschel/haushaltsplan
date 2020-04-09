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

const getDayOfWeekFromCorrespondingNumber = (dayNumber: number) => {
  switch (dayNumber) {
    case 0: return 'sunday';
    case 1: return 'monday';
    case 2: return 'tuesday';
    case 3: return 'wednesday';
    case 4: return 'thursday';
    case 5: return 'friday';
    case 6: return 'saturday';
  }
};

const DayUtil = {
  getDayTwoDaysFromDay,
  getDayOfWeekFromCorrespondingNumber,
};

export default DayUtil;
