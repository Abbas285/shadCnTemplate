import { NextRequest, NextResponse } from "next/server";

const db = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
  },
  {
    id: 6,
    name: "Mrs. Dennis Schulist",
    username: "Leopoldo_Corkery",
    email: "Karley_Dach@jasper.info",
  },
  {
    id: 7,
    name: "Kurtis Weissnat",
    username: "Elwyn.Skiles",
    email: "Telly.Hoeger@billy.biz",
  },
  {
    id: 8,
    name: "Nicholas Runolfsdottir V",
    username: "Maxime_Nienow",
    email: "Sherwood@rosamond.me",
  },
  {
    id: 9,
    name: "Glenna Reichert",
    username: "Delphine",
    email: "Chaim_McDermott@dana.io",
  },
  {
    id: 10,
    name: "Clementina DuBuque",
    username: "Moriah.Stanton",
    email: "Rey.Padberg@karina.biz",
  },
];

export async function GET() {
  return NextResponse.json({ db });
}
export async function POST(request: NextRequest) {
  const body = await request.json();
  db.push({
    id: db.length,
    name: body.name,
    username: body.username,
    email: body.email,
  });
  return NextResponse.json({
    status: "successfully created",
  });
}
export async function DELETE(request: NextRequest) {
  const body = await request.json();
  let id = body.id;
  let isHave = db.find((item) => item.id === id);
  if (isHave) {
    db.filter((item) => item.id !== id);
    return NextResponse.json({
      status: "successfully deleted",
    });
  } else {
    return NextResponse.json({
      status: "User Not exist",
    });
  }
}
export async function PUT(request: NextRequest) {
  const body = await request.json();
  let id = body.id;
  let isHave = db.find((item) => item.id === id);
  if (isHave) {
    let curentIndex = db.findIndex((item) => item.id === body.id);
    db[curentIndex] = body;
    return NextResponse.json({
      status: "successfully update",
    });
  } else {
    return NextResponse.json({
      status: "User Not exist",
    });
  }
}
