  // googleImages(query) {
  //   var myCallback = function() {
  //     if (document.readyState == 'complete') {
  //       // Document is ready when CSE element is initialized.
  //       // Render an element with both search box and search results in div with id 'test'.
  //       google.search.cse.element.render(
  //           {
  //     gname:'gsearch', 
  //             div: "test",
  //             tag:'searchresults-only', 
  //   attributes:{defaultToImageSearch:'true'} 
  //           });
  //   var element = google.search.cse.element.getElement('gsearch');
  //   element.execute(query);

  //     } else {
  //       // Document is not ready yet, when CSE element is initialized.
  //       google.setOnLoadCallback(function() {
  //         // Render an element with both search box and search results in div with id 'test'.
  //           google.search.cse.element.render(
  //               {
  //   gname:'gsearch', 
  //                 div: "test",
  //                 tag:'searchresults-only', 
  //   attributes:{defaultToImageSearch:'true'} 
  //               });

  //   var element = google.search.cse.element.getElement('gsearch');
  //   element.execute('tesla');

  //       }, true);
  //     }
  //   };

  //   // Insert it before the CSE code snippet so that cse.js can take the script
  //   // parameters, like parsetags, callbacks.
  //   window.__gcse = {
  //     parsetags: 'explicit',
  //     callback: myCallback
  //   };

  //   (function() {
  //     var cx = '009325813827127292719:pl3kk1qally';
  //   // Insert your own Custom Search engine ID here
  //     var gcse = document.createElement('script'); gcse.type = 'text/javascript';
  //     gcse.async = true;
  //     gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
  //     var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s);
  //   })();
  // }