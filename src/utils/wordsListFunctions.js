export const selectWords = (info) => {
  const {
    user: { words },
  } = info;
  console.log(words);
};
/* 

function transform(words) {
  let languagesObject = {German: [], French: [], Spanish: []};


  Object.entries(words).map(([key, pairObject])=>{

  const languages = Object.keys(pairObject)


  languagesObject[languages].push(pairObject[languages])

  })

  return languagesObject

}




{Languages: {
    German: [{ cat: die Katze }, { cupboard: der Schrank }],
    French: [{ cat: le chat }, { beer: la biere }]
  }
}

test object: 

let info = {
  token: "eyJhbGciOvLvEGAuL704LikdXMAqhRy49g",
  user: {
    email: "postmanPat1@gmail.com",
    name: "postmanTest1",
    words: {
      'M9SGFmZQY1aVz8-iSmJ': {
        German: {
          cat: "die katze1"
        }
      },
      'M9SGsmPGUtPPncwoVgL': {
        German: {
          cat: "die katze1"
        }
      },
      '-M9SIkTNUVGw4sUR9ceD': {
        German: {
          cat: "die katze1"
        }
      }
    }
  }
};


*/
