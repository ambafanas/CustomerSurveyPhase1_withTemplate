function user_account_creation() {


                        var companyName = document.demoForm.companyName.value;
                         sessionStorage.companyName = companyName;

                         var mobile = document.demoForm.mobile.value;
                         sessionStorage.mobile = mobile;

                         var deskPhone = document.demoForm.deskPhone.value;
                         sessionStorage.deskPhone = deskPhone;

                         var addressLine1 = document.demoForm.addressLine1.value;
                         sessionStorage.addressLine1 = addressLine1;

                         var addressLine2 = document.demoForm.addressLine2.value;
                         sessionStorage.addressLine2 = addressLine2;

                         var country = document.demoForm.country.value;
                         sessionStorage.country = country;

                         var email = document.demoForm.email.value;
                         sessionStorage.email = email;

                         var contactname = document.demoForm.contactname.value;
                         sessionStorage.contactname = contactname;

                         var city = document.demoForm.city.value;
                         sessionStorage.city = city;

                         var addstate = document.demoForm.addstate.value;
                         sessionStorage.addstate = addstate;

                         var zip = document.demoForm.zip.value;
                         sessionStorage.zip = zip;

                       
                        
 }

 
function cust_satisfaction() 
{

                         var used_our_service = document.demoForm.used_our_service.value;
                         sessionStorage.used_our_service = used_our_service;

                          var checkbox1 = document.getElementById("chk1").checked;
                         sessionStorage.setItem('Service A', checkbox1);
                         var checkbox2 = document.getElementById("chk2").checked;
                         sessionStorage.setItem('Service B', checkbox2);
                         var checkbox3 = document.getElementById("chk3").checked;
                         sessionStorage.setItem('Service C', checkbox3);
                         var checkbox4 = document.getElementById("chk4").checked;
                         sessionStorage.setItem('Service D', checkbox4);
                     
                        var purchase_frequency=document.demoForm.purchase_frequency.value;
                        sessionStorage.purchase_frequency=purchase_frequency;

                        var comments=document.demoForm.comments.value;
                        sessionStorage.comments=comments;
                        
}
function customer_support_follow_up() 
 {

                         var checkbox1 = document.getElementById("chk1").checked;
                         sessionStorage.setItem('Service A', checkbox1);
                         var checkbox2 = document.getElementById("chk2").checked;
                         sessionStorage.setItem('Service B', checkbox2);
                         var checkbox3 = document.getElementById("chk3").checked;
                         sessionStorage.setItem('Service C', checkbox3);
                         var checkbox4 = document.getElementById("chk4").checked;
                         sessionStorage.setItem('Service D', checkbox4);


                         var custsupport = document.csfuform.custsupport.value;
                         sessionStorage.custsupport = custsupport;
                      
                        var comment=document.csfuform.comment.value;
                        sessionStorage.comment=comment;
                        
}
