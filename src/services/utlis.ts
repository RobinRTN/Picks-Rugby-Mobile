export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (timeString: string) => {
  // If timeString is already in HH:MM format, return it as is
  if (/^\d{1,2}:\d{2}$/.test(timeString)) {
    return timeString;
  }

  // If it's in HH:MM:SS format, remove seconds
  if (/^\d{1,2}:\d{2}:\d{2}$/.test(timeString)) {
    return timeString.substring(0, 5);
  }

  // If it's a full datetime string, extract time part
  if (timeString.includes('T')) {
    const time = new Date(timeString);
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  // Fallback: try to create a date with the time string
  try {
    const time = new Date(`2000-01-01T${timeString}`);
    if (isNaN(time.getTime())) {
      return timeString; // Return original if parsing fails
    }
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  } catch {
    return timeString; // Return original if any error occurs
  }
};

export const getTeamImage = (teamName: string, logoUrl: string) => {
  switch (teamName) {
    case 'Stade Français':
      return require('../../assets/images/clubs/sf.png');
    case 'Racing 92':
      return require('../../assets/images/clubs/Nanterre.png');
    case 'Stade Toulousain':
      return require('../../assets/images/clubs/toulouse.png');
    case 'ASM Clermont':
      return require('../../assets/images/clubs/clecle 1.png');
    case 'LOU Rugby':
      return require('../../assets/images/clubs/lyon.png');
    case 'Union Bordeaux Bègles':
      return require('../../assets/images/clubs/bordeaux.png');
    case 'Montpellier HR':
      return require('../../assets/images/clubs/montpellier 1.png');
    case 'RC Toulon':
      return require('../../assets/images/clubs/rct.png');
    case 'Section Paloise':
      return require('../../assets/images/clubs/paloise.png');
    case 'Aviron Bayonnais':
      return require('../../assets/images/clubs/aviron.png');
    case 'USA Perpignan':
      return require('../../assets/images/clubs/usap.png');
    case 'Montauban':
      return require('../../assets/images/clubs/usm.png');
    case 'Stade Rochelais':
      return require('../../assets/images/clubs/rochelle.png');
    case 'Castres Olympique':
      return require('../../assets/images/clubs/castres.png');
    default:
      return { uri: logoUrl };
  }
};
