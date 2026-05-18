import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {

  /** adding delay for practice */
  await new Promise((resolve) => setTimeout(resolve, 2000));

  /** .all() for multiple rows data
   * .get() for single row data
   * .run() for inserting data 
   */

  //throw new error('Loading meals failed');
  return db.prepare('SELECT * FROM meals').all();
}


export function getMeal(slug) {

  /** Select * from - where slug = +slug (is not secure way) */
  return db.prepare('SELECT * FROM meals where slug = ?').get(slug);
}

export async function SaveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true }) + Math.random();
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed!');
    }
  });

  /** now saving image into database only as a path
   * since we already saved it in the file system
   * no need to include public here */
  meal.image = `/images/${fileName}`;

  db.prepare(`
    INSERT INTO meals
    (title, summary, instructions, creator, creator_email, image, slug)
    VALUES
    (@title, @summary, @instructions, @creator, @creator_email,
    @image, @slug
    )
    `).run(meal);
}