/**
 * todoアプリを作る
 */

// inputエリアの値をとってくるための関数を作る
const onClickAdd = () => {
  //inputの値（value）を取りたい
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

//未完了から要素削除を関数化する（共通したものがあるから）
const deleteFromIncompleteList = (target) => {
  //親の中から消します
  document.getElementById("imcomplete-list").removeChild(target);
};

//未完了リストに追加する
const createIncompleteList = (text) => {
  //divを作る
  const div = document.createElement("div");
  //div にクラス付与
  div.className = "list-row";

  //li作る
  const li = document.createElement("li");

  //liにはinputの値を入れたい
  li.innerText = text;

  //完了ボタン作る、できたボタンに対して何か処理する関数を入れる
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    //未完了から消す（関数に引数を渡す）
    deleteFromIncompleteList(completeButton.parentNode);
    //完了リストに追加
    //完了の親、list-rowを取得
    const addTarget = completeButton.parentNode;
    //list-lowの１番目の要素（TODOの内容）
    const text = addTarget.firstElementChild.innerText;

    //div以下を初期化
    addTarget.textContent = null;

    //liタグ生成
    const li = document.createElement("li");
    li.innerText = text;

    //ボタン生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      //戻すボタンの親から削除
      const deleteTarget = backButton.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);

      //テキストを取得
      const text = backButton.parentNode.firstElementChild.innerText;
      createIncompleteList(text);
    });

    //divの子要素に設定
    addTarget.appendChild(li);
    addTarget.appendChild(backButton);

    //完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  //削除ボタン作る、できたボタンに対して何か処理する関数を入れる
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    //親の中から消します
    deleteFromIncompleteList(deleteButton.parentNode);
  });

  //divの下にli,完了、削除ボタンを入れる
  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  //ulの下にdivを入れる
  document.getElementById("imcomplete-list").appendChild(div);
};

document
  .getElementById("add-button") //ボタンとってくる
  .addEventListener("click", () => onClickAdd()); //クリックイベントを付与、関数を渡す
