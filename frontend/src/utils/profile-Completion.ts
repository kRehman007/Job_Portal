let PhoneNumberScore = 0;
let TaglineScore = 0;
let ResumeScore = 0;
let SkillsScore = 0;
let BioScore = 0;


export function checkProfileCompletion(UserProfile: any) {
  if (UserProfile?.profile?.phoneNumber) PhoneNumberScore = 15;
  if (UserProfile?.profile?.tagline) TaglineScore = 15;
  if (UserProfile?.profile?.resume) ResumeScore = 30;
  if (UserProfile?.profile?.skills?.length > 0) SkillsScore = 20;
  if (UserProfile?.profile?.bio) BioScore = 20;

  return PhoneNumberScore + TaglineScore + ResumeScore + SkillsScore + BioScore;
}
