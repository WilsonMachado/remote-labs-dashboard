import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          Prototipo para experimentación en sistemas automáticos de control SISO          
        </a>
        <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#exampleModal">
      Ayuda
      </button>
      </div>
      
      <div class="modal fade bd-example-modal-lg" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Acerca del prototipo</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Acá va la información sobre el prototipo
              <br />
              <br />
              <div className="container text-center"><img src="https://controlautomaticoeducacion.com/wp-content/uploads/PIDISA.png" alt="" />
              </div>
              <br />              
             <div className="container text-justify">
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque velit ut nisl gravida molestie. Nam at mattis enim, eu faucibus erat. Nam tempor pharetra aliquam. Aenean vehicula mi a libero pellentesque ullamcorper. Proin in lacinia massa. Suspendisse auctor lacus nec interdum feugiat. Aenean suscipit pretium ex eu semper. Aliquam aliquet gravida odio, cursus interdum enim iaculis nec. Duis finibus velit orci, vel rhoncus ex posuere posuere. Suspendisse a malesuada odio. Vestibulum mattis euismod felis dapibus scelerisque. Curabitur efficitur, ex sit amet fermentum finibus, turpis orci blandit odio, at dapibus lorem orci nec dolor.

Duis porttitor nulla sed felis tempus, eu euismod sem laoreet. Nulla feugiat orci non augue lacinia gravida. Nam non imperdiet leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan dui non ipsum fringilla iaculis. Pellentesque id venenatis sapien. Sed nec ex magna. Fusce venenatis congue interdum. In lacus ex, porttitor vel lacinia a, pellentesque a diam. Curabitur at odio et odio varius iaculis. Cras auctor id lorem nec dignissim. Duis pulvinar elit non turpis efficitur sagittis. Sed vehicula, tortor non varius sollicitudin, ex nibh vestibulum lacus, a posuere erat mauris quis lacus.

Duis nulla arcu, scelerisque nec ante a, ultricies vehicula risus. Etiam posuere ligula sit amet volutpat accumsan. In euismod tristique finibus. Donec hendrerit posuere enim, et pellentesque nisl vulputate quis. Sed sit amet lobortis ipsum, at auctor dolor. Proin sed ultricies mauris. Donec dapibus, nunc et aliquet maximus, nunc metus maximus lorem, eget facilisis dui enim sed turpis. Donec ac ultricies velit, aliquam cursus nisl. Donec convallis tempor tellus a aliquet. Ut a neque vel arcu feugiat rutrum a sit amet enim. Etiam posuere euismod lectus, sit amet dictum nunc bibendum et. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ut blandit justo.

Suspendisse convallis non felis et tempus. Vestibulum finibus tempus nibh, ut dictum odio laoreet rutrum. Ut ac suscipit massa, et mollis nisi. Mauris id venenatis nulla. Donec vitae augue ac nibh malesuada aliquet at vel ligula. Aenean dui leo, sodales ac venenatis quis, cursus ut magna. Morbi malesuada turpis a ultrices bibendum.

Sed elit ligula, condimentum in blandit sit amet, hendrerit quis quam. Proin sagittis diam quis orci tincidunt, et blandit ante tincidunt. Mauris condimentum, mauris a aliquam malesuada, odio elit efficitur metus, sit amet interdum nisl est vel mi. Aliquam erat volutpat. Vestibulum congue nulla sed nisl fermentum, vel ultrices augue cursus. Nullam in convallis est. Pellentesque imperdiet orci vitae dui suscipit, sit amet dignissim est luctus. Duis vitae risus rhoncus, congue magna eget, mollis ligula. Sed gravida, tellus auctor ornare lobortis, nulla odio bibendum nisl, in consequat orci enim eu ante. Nam aliquet, mi at aliquam imperdiet, lacus libero fringilla elit, ut convallis neque tellus nec magna. Mauris vehicula eros nisl, nec egestas enim malesuada nec.
             </div>
              
              
              

            </div>
            <div class="modal-footer">             
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>              
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;