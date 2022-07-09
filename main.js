objects=[];
video="";
status="";
function setup(){
canvas=createCanvas(480,300);
canvas.center();
}

function preload(){
video=createVideo("video.mp4");
video.hide();
}

function draw(){
image(video,0,0,480,300);
if(status!=""){
objectDetector.detect(video,gotResult);
for(i=0;i<objects.length;i++){
    document.getElementById("status").innerHTML="Status: Objects detected";
    document.getElementById("number_of_objects").innerHTML="No. of objects:"+objects.length;
    fill("#02f2fa");
    percent=floor(objects[i].confidence*100);
    text(objects[i].label+" "+percent+"%"+objects[i].x+15,objects[i].y+15);
    nofill();
    stroke("#02f2fa");
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);


}
}
}

function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";

}

function modelLoaded(){
    console.log("model loaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(1);

}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

