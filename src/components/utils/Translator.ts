const translateDay = (dayToTranslate: string) => {
  switch (dayToTranslate) {
    case 'monday': return 'Montag';
    case 'tuesday': return 'Dienstag';
    case 'wednesday': return 'Mittwoch';
    case 'thursday': return 'Donnerstag';
    case 'friday': return 'Freitag';
    case 'saturday': return 'Samstag';
    case 'sunday': return 'Sonntag';
    default: return 'Kein valider Tag';
  }
};

const Translator = {
  translateDay,
};

export default Translator;
