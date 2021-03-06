'use strict';
const tape = require('tape');
const fs = require('fs');
const path = require('path');
const sources = require('../lib/sources');
const index = require('../index');


function assertThumbnailRenders(fixturePath, assert) {
  const geojson = JSON.parse(fs.readFileSync(path.join(__dirname, fixturePath)));

  index.renderThumbnail(geojson, (err, image) => {
    assert.ifError(err, 'preview should not fail');
    assert.true(image.length > 10 * 1024, `preview image should have reasonable image size ${image.length}`);
    assert.end();
  }, {
    backgroundTileJSON: sources.naturalEarth()
  });
}

tape('renderThumbnail water', (assert) => {
  assertThumbnailRenders('/fixtures/water.geojson', assert);
});

tape('renderThumbnail road', (assert) => {
  assertThumbnailRenders('/fixtures/road.geojson', assert);
});

tape('renderThumbnail building', (assert) => {
  assertThumbnailRenders('/fixtures/building.geojson', assert);
});

tape('renderThumbnail peak', (assert) => {
  assertThumbnailRenders('/fixtures/peak.geojson', assert);
});
