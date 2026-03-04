// export const roleSkills = {
//   Frontend: [
//     "html",
//     "css",
//     "javascript",
//     "react",
//     "redux",
//     "tailwind",
//     "responsive"
//   ],
//   Backend: [
//     "node",
//     "express",
//     "mongodb",
//     "mysql",
//     "api",
//     "jwt",
//     "authentication"
//   ],
//   "Full Stack": [
//     "html",
//     "css",
//     "javascript",
//     "react",
//     "node",
//     "express",
//     "mongodb",
//     "mysql",
//     "rest api"
//   ]
// };

// export const matchSkills = (extractedText, selectedRole) => {
//   const text = extractedText.toLowerCase();
//   const requiredSkills = roleSkills[selectedRole] || [];

//   const matched = [];
//   const missing = [];

//   requiredSkills.forEach((skill) => {
//     if (text.includes(skill)) {
//       matched.push(skill);
//     } else {
//       missing.push(skill);
//     }
//   });

//   const percentage =
//     requiredSkills.length > 0
//       ? (matched.length / requiredSkills.length) * 100
//       : 0;

//   return {
//     matchedSkills: matched,
//     missingSkills: missing,
//     skillMatchPercentage: Math.round(percentage)
//   };
// };

export const roleSkills = {
  Frontend: [
    { name: "html", weight: 2 },
    { name: "css", weight: 2 },
    { name: "javascript", weight: 5 },
    { name: "react", weight: 5 },
    { name: "redux", weight: 4 },
    { name: "tailwind", weight: 3 },
    { name: "responsive", weight: 2 }
  ],
  Backend: [
    { name: "node", weight: 5 },
    { name: "express", weight: 4 },
    { name: "mongodb", weight: 4 },
    { name: "mysql", weight: 3 },
    { name: "api", weight: 3 },
    { name: "jwt", weight: 3 },
    { name: "authentication", weight: 3 }
  ],
  "Full Stack": [
    { name: "html", weight: 2 },
    { name: "css", weight: 2 },
    { name: "javascript", weight: 5 },
    { name: "react", weight: 5 },
    { name: "node", weight: 5 },
    { name: "express", weight: 4 },
    { name: "mongodb", weight: 4 },
    { name: "mysql", weight: 3 },
    { name: "rest api", weight: 3 }
  ]
};

export const matchSkills = (extractedText, selectedRole) => {
  const text = extractedText.toLowerCase();
  const requiredSkills = roleSkills[selectedRole] || [];

  let totalWeight = 0;
  let matchedWeight = 0;

  const matched = [];
  const missing = [];

  requiredSkills.forEach((skill) => {
    totalWeight += skill.weight;

    if (text.includes(skill.name)) {
      matched.push(skill.name);
      matchedWeight += skill.weight;
    } else {
      missing.push(skill.name);
    }
  });

  const percentage =
    totalWeight > 0
      ? Math.round((matchedWeight / totalWeight) * 100)
      : 0;

  return {
    matchedSkills: matched,
    missingSkills: missing,
    skillMatchPercentage: percentage
  };
};