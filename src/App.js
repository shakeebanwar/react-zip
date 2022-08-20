import logo from './logo.svg';
import './App.css';
import JSZip from 'jszip'
import saveAs from 'save-as';
import JSZipUtils from 'jszip-utils';



function App() {


  const downloadfiles = () => {



    const urls = [
      'https://cdn.pixabay.com/photo/2012/04/12/23/48/car-30990__340.png',
      "https://thumbs.dreamstime.com/b/porsche-sports-car-white-isolate-white-55686111.jpg",
      "https://parkingdatabucket.s3.amazonaws.com/videos/stepimg3.png",
      "https://api.libraa.ml/media/Users/91195__01_1__1.jpg",
      "https://api.libraa.ml/media/category_pic/1010-10-10-10-10_Web%20Application%20Basics.svg"
 
  ];
  const zip = new JSZip();
  let count = 0;
  const zipFilename = "evidence.zip";
  urls.forEach(async function (url){
    const urlArr = url.split('/');
    const filename = urlArr[urlArr.length - 1];
    try {
      const file = await JSZipUtils.getBinaryContent(url)
      zip.file(filename, file, { binary: true});
      count++;
      if(count === urls.length) {
        zip.generateAsync({type:'blob'}).then(function(content) {
          saveAs(content, zipFilename);
        });
      }
    } catch (err) {
      console.log(err);
    }
  });


  }
  return (
    <div className="App">
      <h1>zipfile downloader</h1>
      <button onClick={() => downloadfiles()}>Download files</button>
    </div>
  );
}

export default App;
