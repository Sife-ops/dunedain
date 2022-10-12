import axios from "axios";
import { dunedainModel } from "@dunedain/core/model";

export const handler = async (event: any) => {
  // todo: zod schema
  const bookmark = JSON.parse(event.Records[0].body) as {
    userId: string;
    bookmarkId: string;
    url: string;
    favicon: string;
  };

  try {
    const res = await axios.get(
      `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${bookmark.url}&size=16`,
      {
        responseType: "arraybuffer",
      }
    );

    const favicon = Buffer.from(res.data).toString("base64");

    if (favicon === bookmark.favicon) {
      return;
    }

    await dunedainModel.entities.BookmarkEntity.update(bookmark)
      .set({ favicon })
      .go();

    console.log(`updated ${bookmark.bookmarkId} from ${bookmark.url}`);
  } catch (e) {
    console.log(
      `could not update ${bookmark.bookmarkId} favicon from ${bookmark.url}`
    );
    console.log(e);
  }

  return;
};
